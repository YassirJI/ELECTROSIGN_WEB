import {NgModule,Component,OnInit,Input,Output,EventEmitter,TemplateRef,AfterContentInit,ContentChildren,QueryList} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DomSanitizer} from '@angular/platform-browser';
import {MessagesModule} from '../messages/messages';
import {ProgressBarModule} from '../progressbar/progressbar';
import {TemplateLoader, PrimeTemplate} from '../common/template-loader.component';
import {FileUploadComponent} from './fileupload.component';


@NgModule({
    imports: [CommonModule,ProgressBarModule,MessagesModule],
    exports: [FileUploadComponent,ProgressBarModule,MessagesModule],
    declarations: [FileUploadComponent, TemplateLoader, PrimeTemplate]
})
export class FileUploadModule { }