import { Component, OnInit, AfterViewInit, NgZone  } from '@angular/core';
import { Router } from '@angular/router';

import { SignService } from '../../../services/electrosign/sign.service';

import { Signer } from '../../../model/electrosign/signer';
import { Tabs } from '../../../model/electrosign/tabs';
import { Document } from '../../../model/electrosign/document';

import { PreparePackageFormDataService } from '../../../services/electrosign/preparePackageFormData.service';

import SignaturePad from 'signature_pad';
import * as html2canvas from "html2canvas";

@Component({
    selector: 'signing-document',
    templateUrl: './document-signing.component.html'
})
export class DocumentSigningComponent implements OnInit, AfterViewInit  {
   
   private activeRecipientId : number = 1;
   private activeSigner : Signer;
   private activeTypedSignerName:string

   private pageNum: number = 1;
   private pageCount: number;
   private zoomValue: number = 1;

   private documents : Document[] = [];

   private submissionMessage: any;
   private errorMessage: any;

   private signHereIncrement:number = 1;
   private activeSignatureTagId:string;
   
   private signaturePad:SignaturePad;


   constructor(private router: Router, private signService:SignService, private preparePackageFormDataService: PreparePackageFormDataService, private ngZone:NgZone) {
      window.onresize = (e) =>
      {
            this.ngZone.run(() => {
                  this.cleanTagsFromDropZone();
                  this.addAddedTagsToNewDropZone();
              });
        };
   }
    
    ngOnInit(): void {
      // this.signService.getSigner(this.activeRecipientId)
      //  .subscribe(signer=> this.activeSigner = signer);

       this.activeSigner = this.preparePackageFormDataService.getPackage().recipients.signers[0];
       this.documents = this.preparePackageFormDataService.getPackage().documents;
       this.activeTypedSignerName =  this.activeSigner.name;

     //  if (this.activeSigner) {
     //      this.router.navigate(['/noAccessError']);
     //   }
    }

    ngAfterViewInit() : void {
        this.initSignaturePad();
        
        setTimeout(() => {
            this.addAddedTagsToNewDropZone();
        }, 1000);
    }

    initSignaturePad():void {
         this.signaturePad = new SignaturePad(document.querySelector("#signature-pad"), {backgroundColor: 'rgba(255, 255, 255, 0)', penColor: 'rgb(0, 0, 0)'});
    }

    private isImage(file: File): boolean {
        return /^image\//.test(file.type);
    }

    private isPdf(file: File): boolean {
        return 'application/pdf' === file.type;
    }

       // PDF views toolbar 
   callBackFn(pdf: PDFDocumentProxy) {
      this.pageCount = pdf.numPages;
   }

   goPrevious(): void {
    if(this.activeSigner && this.pageNum>1) {
        this.cleanTagsFromDropZone();
        this.pageNum -= 1;
        this.addAddedTagsToNewDropZone();
     }
   }

   goNext(): void {
       if(this.activeSigner && this.pageNum < this.pageCount) {
        this.cleanTagsFromDropZone();
        this.pageNum += 1;
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
   
    addAddedTagsToNewDropZone(): void {
               
        if(this.activeSigner != null && this.activeSigner.tabs != null) {
          let newElement;
          this.activeSigner.tabs.signHereTabs.forEach(tab => {             
            if(this.pageNum == tab.pageNumber) {
                newElement = this.createSignHereTagElement(tab.tabType, this.xPositionFromPercentValue(tab.xPosition), this.yPositionFromPercentValue(tab.yPosition), tab.pageNumber);
                $(".dropZone").append(newElement);
            }
           });
          this.activeSigner.tabs.dateSignedTabs.forEach(tab => {
            if(this.pageNum == tab.pageNumber) {
                newElement = this.createDateSignedTagElement(tab.tabType, this.xPositionFromPercentValue(tab.xPosition), this.yPositionFromPercentValue(tab.yPosition), tab.pageNumber, this.dateNow());
                $(".dropZone").append(newElement);
            }
           });
          this.activeSigner.tabs.textTabs.forEach(tab => {
            if(this.pageNum == tab.pageNumber) {
                newElement = this.createTextTagElement(tab.tabType, this.xPositionFromPercentValue(tab.xPosition), this.yPositionFromPercentValue(tab.yPosition), tab.pageNumber);
                $(".dropZone").append(newElement);
            }
           });
        }
    }

    private createSignHereTagElement(tagType:string, offsetXPos:number, offsetYPos:number, pageNumber:number) {      
      let newElement =  $("<div data-toggle='modal' data-target='#signatureModal' class='signerTag' id='signTagDiv"+this.signHereIncrement+"' signTagId='"+this.signHereIncrement+"' recipientId='0' pageNumber="+pageNumber+" tagtype='"+tagType+"' style='cursor:pointer; position: absolute; left:" + offsetXPos + "px; top:" + offsetYPos + "px;background-image:url(../../../../public/assets/images/sign_here.png);background-repeat:no-repeat;background-position:center;background-size: contain;height:35px;width:160px;background-color: antiquewhite;border: 1px solid #BEBEBE; margin: 0 5px 10px 0;' id='dragTagDiv'></div>");
      let jThis = this;
      newElement.click(function (evt) {
              jThis.activeSignatureTagId = this.id;
              jThis.clearCanvasSignature();
          });
      this.signHereIncrement++;
      return newElement;
    }

    private createDateSignedTagElement(tagType:string, offsetXPos:number, offsetYPos:number, pageNumber:number, date:string) {      
      return $("<div class='signerTag' recipientId='0' pageNumber="+pageNumber+" tagtype='"+tagType+"' style='position: absolute; left:" + offsetXPos + "px; top:" + offsetYPos + "px;height:35px;width:160px;margin: 0 5px 10px 0;' id='dragTagDiv'><span class='unselected' style='font-size: 15px;color: black;'>"+date+"</span></div>");
    }

    private createTextTagElement(tagType:string, offsetXPos:number, offsetYPos:number, pageNumber:number) {      
     return $("<div class='signerTag' recipientId='0' pageNumber="+pageNumber+" tagtype='"+tagType+"' style='position: absolute; left:" + offsetXPos + "px; top:" + offsetYPos + "px;height:35px;width:160px;margin: 0 5px 10px 0;' id='dragTagDiv'><input type='text' placeholder='Enter your text here ...' style='height:35px;min-width:160px;padding-left: 5px;'/></div>");
    }

    private dateNow(): string {
        let date: Date = new Date();
        return (date.getFullYear().toString() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + ("0" + (date.getDate())).slice(-2));
    }

    private cleanTagsFromDropZone():void {
        $(".signerTag").remove();
    }
    
    
    xPositionFromPercentValue(percentXPos:number):number {
      let width:string = $("div.dropZone canvas").attr("width");
      console.log("width", $("div.dropZone canvas").attr("width"));
      
      return parseFloat(width)*percentXPos/100;
    }

    yPositionFromPercentValue(percentYPos:number):number {
      let height:string = $("div.dropZone canvas").attr("height");
      console.log("height", $("div.dropZone canvas").attr("height"));
      
      return parseFloat(height)*percentYPos/100;
    }

    saveSignature():void {
 
        let image;
        let jThis = this;
    
        if($("#drawIt").is(".active")){
            image = this.signaturePad.toDataURL('image/png');
            jThis.updatePeronalizedSignatureTag(jThis, image);
        } else {
            html2canvas($("#divtypeName")).then(function(canvas) {
                image = canvas.toDataURL('image/png');
                jThis.updatePeronalizedSignatureTag(jThis, image);
                });
        }
   }
 
   updatePeronalizedSignatureTag(jThis:any, image:any):void {
       let tagDivElement = $("#" + this.activeSignatureTagId + "");
       tagDivElement.css('background-image', 'url("' + image + '")');
       tagDivElement.css('background-color', 'white');
       tagDivElement.width(180);
       tagDivElement.height(60);   
   }
 
   clearCanvasSignature():void {
       this.signaturePad.clear();
   }

    private onSubmit() {
       /* this.signService.saveSignedDocument()
            .subscribe(
            message => console.log(this.submissionMessage = message),
            error => this.errorMessage = error);*/
    }

    
}
