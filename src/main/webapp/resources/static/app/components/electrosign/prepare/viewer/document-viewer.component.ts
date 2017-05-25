import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

import { PreparePackageFormDataService } from '../../../../services/electrosign/preparePackageFormData.service';

import { Document } from '../../../../model/electrosign/document'; 
import { Tab } from '../../../../model/electrosign/tab';


@Component({
  selector: 'document-viewer',
  templateUrl: './document-viewer.component.html'
})
export class DocumentViewerComponent  implements OnInit{
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
     if(this.pageNum>1) this.pageNum -= 1;
   }

   goNext(): void {
     if(this.pageNum < this.pageCount) this.pageNum += 1;
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
        this.addDraggedItemToDropZone(this, element, draggEvent);
        //this.disableDraggableItem();

      }else{
        this.changeDraggedPosition(element);
      }
    }


    addDraggedItemToDropZone(jThis : any, element : any, draggEvent:DragEvent) : void {
        var offsetXPos = draggEvent.offsetX ;
        var offsetYPos = draggEvent.offsetY ;
        
        let newElement;
        if (element.hasClass("signature-tool")) {
            newElement =  $("<div draggable class='signerTag signHereTag draggable' recipientId='0'  order='0' tagtype='signHere' tagcolor='tagTopYellow' style='position: absolute; left:" + offsetXPos + "px; top:" + offsetYPos + "px;background-image:url(../../../../public/assets/images/sign_here.png);background-repeat:no-repeat;background-position:center;background-size: contain;height:35px;width:160px;background-color: antiquewhite;cursor: move; border: 1px solid #BEBEBE; margin: 0 5px 10px 0;' clonedtag='yes' id='dragTagDiv'></div>");
        }
        else if (element.hasClass("text-tool")) {
            newElement = $("<div draggable class='signerTag nameHereTag draggable' recipientId='0'  order='0' tagtype='text' tagcolor='tagTopYellow' style='position: absolute; left:" + offsetXPos + "px; top:" + offsetYPos + "px; background-image:url(../../../../public/assets/images/text.png);background-repeat:no-repeat;background-position:center;background-size: contain;height:35px;width:160px;background-color: antiquewhite;cursor: move; border: 1px solid #BEBEBE; margin: 0 5px 10px 0;' clonedtag='yes' id='dragTagDiv'></div>");
        }
        else if (element.hasClass("date-tool")) {
            newElement =  $("<div draggable class='signerTag nameHereTag draggable' recipientId='0'  order='0' tagtype='dateSigned' tagcolor='tagTopYellow' style='position: absolute; left:" + offsetXPos + "px; top:" + offsetYPos + "px;background-image:url(../../../../public/assets/images/signed_date.png);background-repeat:no-repeat;background-position:center;background-size: contain;height:35px;width:160px;background-color: antiquewhite;cursor: move; border: 1px solid #BEBEBE; margin: 0 5px 10px 0;' clonedtag='yes' id='dragTagDiv'></div>");
        }
        newElement.bind("dragstart", function(event) {
          return jThis.onDrag(<DragEvent>event.originalEvent);
        });
        $(".dropZone").append(newElement);
    
          console.log(newElement);
    }

    disableDraggableItem() : void {
      this.draggedItem.setAttribute("disabled","disabled");
      this.draggedItem.removeAttribute("draggable");
    }

    changeDraggedPosition(element:any){
      element.css({top:this.offsetY.valueOf(),left:this.offsetX.valueOf()});
    }

    saveSign() : void {
          let signerTabs : Tab[] = [] ; 
          $(".signerTag").each(function () {
                      var element = $(this);
                      signerTabs.push(
                      {
                            'xPosition' : element.css("left"),
                            'yPosition' : element.css("top"),
                            'documentId': 1,
                            'pageNumber': 1,
                            'recipientId' : Number(element.attr("recipientId")),
                            'tabType' : element.attr("tagtype")
                            //order: element.attr("order"),
                        });
            });
        console.log(signerTabs);
    }

  }