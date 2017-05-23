import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent }  from './app.component';
import { SharedModule } from './shared/shared.module';
import { SignModule } from './electrosign/sign.module';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    SignModule,
    SharedModule,
    RouterModule.forRoot([], { useHash: true })
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
