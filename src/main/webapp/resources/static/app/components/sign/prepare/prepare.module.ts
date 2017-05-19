import { NgModule }           from '@angular/core';
import { BrowserModule }      from '@angular/platform-browser';
import { RouterModule}        from '@angular/router';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';

import { PrepareComponent }       from './prepare.component';

import { PrepareFormDataService }    from './data/prepareFormData.service'

import { PdfViewerComponent } from 'ng2-pdf-viewer';

import { PrepareSignInformationComponent } from './prepare-sign-information.component';
import { PrepareSignMarkerComponent } from './prepare-sign-marker.component';

import { DocumentUploaderComponent } from './uploader/document-uploader.component';
import { DocumentViewerComponent } from './viewer/document-viewer.component';
import { RecipientAdderComponent } from './recipient/recipient-adder.component'
import { PrepareEmailFormComponent } from './email/email-form.component'
import { FileUpload } from './uploader/fileupload'
import { ButtonModule } from './uploader/button/button';
import { ProgressBarModule } from './uploader/progressbar/progressbar';
import { MessagesModule } from './uploader/messages/messages';
import { SharedModuleUp, TemplateLoader } from './uploader/common/shared';

import { FileUploadModule } from "ng2-file-upload/file-upload/file-upload.module";
import { SharedModule} from "../../shared/shared.module";

@NgModule({
    imports:      [ BrowserModule, 
                    FormsModule,
                    ReactiveFormsModule,
                    FileUploadModule,
                    SharedModule,
                    ButtonModule,
                    ProgressBarModule,
                    MessagesModule,
                    RouterModule.forChild([
                     { path: 'prepare', component: PrepareSignInformationComponent },
                     { path: 'prepare/send', component: PrepareSignMarkerComponent }
                      ]) 
                  ],
    providers:    [
                    { provide: PrepareFormDataService, useClass: PrepareFormDataService }
                   ],
    declarations: [ PrepareComponent,
                    PdfViewerComponent,
                    PrepareSignInformationComponent,
                    PrepareSignMarkerComponent,
                    PrepareEmailFormComponent,
                    DocumentUploaderComponent,
                    DocumentViewerComponent,
                    RecipientAdderComponent,
                    FileUpload,
                    TemplateLoader ],
    exports:      [ PrepareComponent]
})

export class PrepareModule {}
