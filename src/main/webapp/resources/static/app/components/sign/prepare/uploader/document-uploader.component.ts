import { Component } from '@angular/core';

import { Message} from './messages/message';
import { PrepareFormDataService } from '../data/prepareFormData.service';
 
@Component({
  selector: 'document-uploader',
  templateUrl: './document-uploader.component.html'
})
export class DocumentUploaderComponent {
 
  msgs: Message[];
  uploadedFiles: any[] = [];

    constructor(private prepareFormDataService: PrepareFormDataService){}
    onUpload(event:any) {
        for(let file of event.files) {
            this.uploadedFiles.push(file);
        }
        
        this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'File Uploaded', detail: ''});

     //   this.prepareFormDataService.setUploadedFiles(event.files);
   
    }

}