import { Component, OnInit, OnChanges, SimpleChange, Input } from '@angular/core';
import * as $ from 'jquery';

import { PreparePackageFormDataService } from '../../../../services/electrosign/preparePackageFormData.service';

import { Document } from '../../../../model/electrosign/document'; 
import { Signer } from '../../../../model/electrosign/signer'; 
import { Tabs } from '../../../../model/electrosign/tabs';
import { Tab } from '../../../../model/electrosign/tab';


@Component({
  selector: 'document-viewer',
  templateUrl: './document-viewer.component.html'
})
export class DocumentViewerComponent  implements OnInit, OnChanges{

    @Input()
    private selectedSigner : Signer;

    private draggedItem:Element;
    private offsetX:number;
    private offsetY:number;

    pageNum: number = 1;
    pageCount: number;
    zoomValue: number = 1;

    documents : Document[] = [];

   constructor(private preparePackageFormDataService: PreparePackageFormDataService){}
   
   ngOnInit(): void {
      this.documents = this.preparePackageFormDataService.getPackage().documents;
     }
   
   ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
      for (let propName in changes) {
        let changedProp = changes[propName];
        let to = JSON.stringify(changedProp.currentValue);
        
        this.cleanTagsFromDropZone();
        this.addAddedTagsToNewDropZone();
      }
      
    }
    
    isImage(file: File): boolean {
        return /^image\//.test(file.type);
    }

    isPdf(file: File): boolean {
        return 'application/pdf' === file.type;
    }
    

   // PDF views toolbar 
   callBackFn(pdf: PDFDocumentProxy) {
      this.pageCount = pdf.numPages;
   }

   goPrevious(): void {
     if(this.selectedSigner) {
        this.selectedSigner.tabs = this.saveSignerTabs()
        this.cleanTagsFromDropZone();
        if(this.pageNum>1) this.pageNum -= 1;
        this.addAddedTagsToNewDropZone();
     }
   }

   goNext(): void {
     if(this.selectedSigner) {
        this.selectedSigner.tabs = this.saveSignerTabs()
        this.cleanTagsFromDropZone();
        if(this.pageNum < this.pageCount) this.pageNum += 1;
        this.addAddedTagsToNewDropZone();
     }
   }
   
   onPageNumChange() : void {
     if(this.selectedSigner) {
        this.selectedSigner.tabs = this.saveSignerTabs()
        this.cleanTagsFromDropZone();
        this.addAddedTagsToNewDropZone();
     }
   }

   zoomIn(): void {
     this.zoomValue -= 0.1;
   }
   zoomOut(): void {
     this.zoomValue += 0.1;
   }

   fit(): void {
     this.zoomValue = 1;
   }
   

   ///////// Drag&Drop events

   onDrag(draggEvent:DragEvent):void{
      this.draggedItem=draggEvent.srcElement;
    }

    onDragEnter(draggEvent:DragEvent):void {
    
    }

    onDragleave(draggEvent:Event):void {
    }

    onDragOver(draggEvent:DragEvent):void{
    
        draggEvent.preventDefault();
        this.offsetX=draggEvent.offsetX;
        this.offsetY=draggEvent.offsetY;
    }

    onDragEnd(draggEvent:DragEvent):void{
    }

    onDrop(draggEvent:DragEvent):void{
      let element=$(this.draggedItem);

      if(element.hasClass("tool-button")){
        this.addNewDraggedItemToDropZone(this, element, draggEvent);
      }else{
        this.changeDraggedPosition(element);
      }
    }


    addNewDraggedItemToDropZone(jThis : any, element : any, draggEvent:DragEvent) : void {
        var offsetXPos = draggEvent.offsetX ;
        var offsetYPos = draggEvent.offsetY ;

        let newElement;
        if (element.hasClass("signature-tool")) {
            newElement = this.createSignerTagElement("signHere", offsetXPos, offsetYPos, this.pageNum);
        }
        else if (element.hasClass("text-tool")) {
            newElement = this.createSignerTagElement("text", offsetXPos, offsetYPos, this.pageNum);
        }
        else if (element.hasClass("date-tool")) {
            newElement = this.createSignerTagElement("dateSigned", offsetXPos, offsetYPos, this.pageNum);
        }

        newElement.bind("dragstart", function(event) {
          return jThis.onDrag(<DragEvent>event.originalEvent);
        });
        $(".dropZone").append(newElement);
    
        console.log(newElement);
    }

    createSignerTagElement(tagType:string, offsetXPos:number, offsetYPos:number, pageNumber:number) {      
      var tagImageName:string =  this.findTagImageByType(tagType);
      return $("<div draggable class='signerTag draggable' recipientId='0'  order='0' pageNumber="+pageNumber+" tagtype='"+tagType+"' tagcolor='tagTopYellow' style='position: absolute; left:" + offsetXPos + "px; top:" + offsetYPos + "px;background-image:url(../../../../public/assets/images/"+tagImageName+");background-repeat:no-repeat;background-position:center;background-size: contain;height:35px;width:160px;background-color: antiquewhite;cursor: move; border: 1px solid #BEBEBE; margin: 0 5px 10px 0;' clonedtag='yes' id='dragTagDiv'></div>");
    }

    findTagImageByType(tagType:string):string {
      if("signHere" == tagType) {
        return "sign_here.png";
      }
      if("text" == tagType) {
        return "text.png";
      }
      if("dateSigned" == tagType) {
        return "signed_date.png";
      }
      return null;
    }

    addAddedTagsToNewDropZone(): void {
               
        if(this.selectedSigner != null && this.selectedSigner.tabs != null) {
          let newElement;
          this.selectedSigner.tabs.signHereTabs.forEach(tab => {
            if(this.pageNum == tab.pageNumber) {
                newElement = this.createSignerTagElement(tab.tabType, parseFloat(tab.xPosition), parseFloat(tab.yPosition), tab.pageNumber);
                $(".dropZone").append(newElement);
            }
           });
          this.selectedSigner.tabs.dateSignedTabs.forEach(tab => {
            if(this.pageNum == tab.pageNumber) {
                newElement = this.createSignerTagElement(tab.tabType, parseFloat(tab.xPosition), parseFloat(tab.yPosition), tab.pageNumber);
                $(".dropZone").append(newElement);
            }
           });
          this.selectedSigner.tabs.textTabs.forEach(tab => {
            if(this.pageNum == tab.pageNumber) {
                newElement = this.createSignerTagElement(tab.tabType, parseFloat(tab.xPosition), parseFloat(tab.yPosition), tab.pageNumber);
                $(".dropZone").append(newElement);
            }
           });
        }
    }

    cleanTagsFromDropZone():void {
        $(".signerTag").remove();
    }

    disableDraggableItem() : void {
      this.draggedItem.setAttribute("disabled","disabled");
      this.draggedItem.removeAttribute("draggable");
    }

    changeDraggedPosition(element:any){
      element.css({top:this.offsetY.valueOf(),left:this.offsetX.valueOf()});
    }

    saveSignerTabs() : Tabs {
          let signHereTabs : Tab[] = [] ; 
          let dateSignedTabs : Tab[] = [] ; 
          let textTabs : Tab[] = [] ; 

          $(".signerTag").each(function () {
                      var element = $(this);
                      var tagType = element.attr("tagtype");
                      var tab : Tab = {
                                  'xPosition' : element.css("left"),
                                  'yPosition' : element.css("top"),
                                  'documentId': 1,
                                  'pageNumber': parseFloat(element.attr("pageNumber")),
                                  'tabType' : element.attr("tagtype")
                                  //order: element.attr("order"),
                              };

                      if(tagType === "signHere"){
                            signHereTabs.push(tab);
                      } else if(tagType === "text"){
                            textTabs.push(tab);
                      } else if(tagType === "dateSigned"){
                            dateSignedTabs.push(tab);
                      }
            });
        
        var tabs : Tabs = new Tabs();
        tabs.signHereTabs =  signHereTabs;
        tabs.dateSignedTabs = dateSignedTabs;
        tabs.textTabs = textTabs;
        
        return this.addTabsToSelectedSigner(this.selectedSigner.tabs, tabs);

    }

    addTabsToSelectedSigner(signerTabs : Tabs, newTabs:Tabs): Tabs {
      signerTabs.signHereTabs = signerTabs.signHereTabs.filter(tab => tab.pageNumber !== this.pageNum).concat(newTabs.signHereTabs);
      signerTabs.dateSignedTabs = signerTabs.dateSignedTabs.filter(tab => tab.pageNumber !== this.pageNum).concat(newTabs.dateSignedTabs);
      signerTabs.textTabs = signerTabs.textTabs.filter(tab => tab.pageNumber !== this.pageNum).concat(newTabs.textTabs);
      return signerTabs;
    }
  }