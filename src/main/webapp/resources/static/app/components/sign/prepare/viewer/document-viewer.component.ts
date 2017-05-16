import { Component } from '@angular/core';
 
 
@Component({
  selector: 'document-viewer',
  templateUrl: './document-viewer.component.html'
})
export class DocumentViewerComponent {
  
    pdfSrc: string = 'https://vadimdez.github.io/ng2-pdf-viewer/pdf-test.pdf';
    pageNum: number = 1;
    pageCount: number;
    zoomValue: number = 1;

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