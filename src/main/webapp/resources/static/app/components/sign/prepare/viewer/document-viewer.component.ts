import { Component } from '@angular/core';

import { PrepareFormDataService } from '../data/prepareFormData.service';
 
@Component({
  selector: 'document-viewer',
  templateUrl: './document-viewer.component.html'
})
export class DocumentViewerComponent {
  
    pageNum: number = 1;
    pageCount: number;
    zoomValue: number = 1;

   constructor(private prepareFormDataService: PrepareFormDataService){}
   
   
    isImage(file: File): boolean {
        return /^image\//.test(file.type);
    }

    isPdf(file: File): boolean {
        return 'application/pdf' === file.type;
    }
    
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
   
  }