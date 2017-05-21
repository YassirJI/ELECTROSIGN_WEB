import { Component } from '@angular/core';

import {Message} from './common/api';
 
@Component({
  selector: 'document-uploader',
  templateUrl: './document-uploader.component.html'
})
export class DocumentUploaderComponent {
 
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