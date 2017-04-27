import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent }  from './app.component.js';
import { DashboardModule } from './components/dashboard/dashboard.module.js';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot([]),
    DashboardModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
