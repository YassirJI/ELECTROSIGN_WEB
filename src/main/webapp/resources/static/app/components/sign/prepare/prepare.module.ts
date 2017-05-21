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
import { RecipientAdderComponent } from './recipient/recipient-adder.component';
import { PrepareEmailFormComponent } from './email/email-form.component';
import { NavbarComponent }    from './navbar/navbar.component';
import { FileUploadComponent } from './uploader/fileupload.component'
import { ProgressBarModule } from './uploader/progressbar/progressbar';
import { MessagesModule } from './uploader/messages/messages';
import { SharedModuleUp, TemplateLoader } from './uploader/common/shared';

import { SharedModule} from "../../shared/shared.module";

@NgModule({
    imports:      [ BrowserModule, 
                    FormsModule,
                    ReactiveFormsModule,
                    SharedModule,
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
                    RecipientAdderComponent ,
                    NavbarComponent,
                    FileUploadComponent,
                    TemplateLoader ],
    exports:      [ PrepareComponent]
})

export class PrepareModule {}
