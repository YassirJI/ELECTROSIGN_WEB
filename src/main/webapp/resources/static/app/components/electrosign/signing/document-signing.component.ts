import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SignService } from '../../../services/electrosign/sign.service';

import { Signer } from '../../../model/electrosign/signer';
import { Tabs } from '../../../model/electrosign/tabs';
import { Document } from '../../../model/electrosign/document';

import { PreparePackageFormDataService } from '../../../services/electrosign/preparePackageFormData.service';

@Component({
    selector: 'signing-document',
    templateUrl: './document-signing.component.html'
})
export class DocumentSigningComponent implements OnInit {
   
   private activeRecipientId : number = 1;
   private activeSigner : Signer;

   private pageNum: number = 1;
   private pageCount: number;
   private zoomValue: number = 1;

   private documents : Document[] = [];

   private submissionMessage: any;
   private errorMessage: any;

   constructor(private router: Router, private signService:SignService, private preparePackageFormDataService: PreparePackageFormDataService) {
   }
    
    ngOnInit(): void {
       this.signService.getSigner(this.activeRecipientId)
        .subscribe(signer=> this.activeSigner = signer);

       this.documents = this.preparePackageFormDataService.getPackage().documents;
       if (this.activeSigner) {
           this.router.navigate(['/noAccessError']);
        }
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
               
        if(this.activeSigner != null && this.activeSigner.tabs != null) {
          let newElement;
          this.activeSigner.tabs.signHereTabs.forEach(tab => {
            if(this.pageNum == tab.pageNumber) {
                newElement = this.createSignerTagElement(tab.tabType, parseFloat(tab.xPosition), parseFloat(tab.yPosition), tab.pageNumber);
                $(".dropZone").append(newElement);
            }
           });
          this.activeSigner.tabs.dateSignedTabs.forEach(tab => {
            if(this.pageNum == tab.pageNumber) {
                newElement = this.createSignerTagElement(tab.tabType, parseFloat(tab.xPosition), parseFloat(tab.yPosition), tab.pageNumber);
                $(".dropZone").append(newElement);
            }
           });
          this.activeSigner.tabs.textTabs.forEach(tab => {
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

   private onSubmit() {
       
       /* this.signService.saveSignedDocument()
            .subscribe(
            message => console.log(this.submissionMessage = message),
            error => this.errorMessage = error);*/
    }

    
}
