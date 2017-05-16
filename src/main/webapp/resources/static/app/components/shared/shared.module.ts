import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { RdWidgetComponent } from './widgets/rd-widget/widget.component';
import { RdWidgetBodyComponent } from './widgets/rd-widget-body/widget-body.component';
import { RdWidgetHeaderComponent } from './widgets/rd-widget-header/widget-header.component';
import { RdWidgetFooterComponent } from './widgets/rd-widget-footer/widget-footer.component';


@NgModule({
  imports: [
    BrowserModule,
    HttpModule
  ],
  declarations: [
    RdWidgetComponent, 
    RdWidgetBodyComponent, 
    RdWidgetFooterComponent, 
    RdWidgetHeaderComponent
  ],
  exports: [
    RdWidgetComponent, 
    RdWidgetBodyComponent, 
    RdWidgetFooterComponent, 
    RdWidgetHeaderComponent
  ]
})
export class SharedModule { }
