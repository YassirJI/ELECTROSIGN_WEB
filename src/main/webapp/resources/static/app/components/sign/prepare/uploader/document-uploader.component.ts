import { Component } from '@angular/core';

import {Message} from './common/api';
const URL = '.';
 
@Component({
  selector: 'document-uploader',
  templateUrl: './document-uploader.component.html'
})
export class DocumentUploaderComponent {
    
    uploadedFiles: any[] = [];

    onUpload(event:any) {
        for(let file of event.files) {
            this.uploadedFiles.push(file);
        }
    }
}