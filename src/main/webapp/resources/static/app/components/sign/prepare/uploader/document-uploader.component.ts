import { Component } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

import {Message} from './common/api';
const URL = '.';
 
@Component({
  selector: 'document-uploader',
  templateUrl: './document-uploader.component.html'
})
export class DocumentUploaderComponent {
  
  public uploader:FileUploader = new FileUploader({url: URL});
 
  msgs: Message[];
    
    uploadedFiles: any[] = [];

    onUpload(event:any) {
        for(let file of event.files) {
            this.uploadedFiles.push(file);
        }
        
        this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'File Uploaded', detail: ''});
    }

}