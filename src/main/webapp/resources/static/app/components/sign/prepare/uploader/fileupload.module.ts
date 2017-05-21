import {NgModule,Component,OnInit,Input,Output,EventEmitter,TemplateRef,AfterContentInit,ContentChildren,QueryList} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DomSanitizer} from '@angular/platform-browser';
import {MessagesModule} from './messages/messages';
import {ProgressBarModule} from './progressbar/progressbar';
import {Message} from './common/api';
import {PrimeTemplate, TemplateLoader, SharedModuleUp} from './common/shared';
import {FileUploadComponent} from './fileupload.component';


@NgModule({
    imports: [CommonModule,SharedModuleUp,ProgressBarModule,MessagesModule],
    exports: [FileUploadComponent,SharedModuleUp,ProgressBarModule,MessagesModule],
    declarations: [FileUploadComponent]
})
export class FileUploadModule { }