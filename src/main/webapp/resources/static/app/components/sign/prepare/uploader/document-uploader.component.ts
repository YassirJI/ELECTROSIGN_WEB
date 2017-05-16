import { Component } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
 
const URL = '.';
 
@Component({
  selector: 'document-uploader',
  templateUrl: './document-uploader.component.html'
})
export class DocumentUploaderComponent {
  
  public uploader:FileUploader = new FileUploader({url: URL});
 
}