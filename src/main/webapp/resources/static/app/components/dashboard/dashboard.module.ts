import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';  
import { FormsModule } from '@angular/forms';

import { DashboardComponent } from './dashboard.component.js';
import { RdWidgetComponent } from '../rd-widget/widget.component.js';
import { RdWidgetBodyComponent } from '../rd-widget-body/widget-body.component.js';
import { RdWidgetHeaderComponent } from '../rd-widget-header/widget-header.component.js';
import { RdWidgetFooterComponent } from '../rd-widget-footer/widget-footer.component.js';
import { RdLoading } from '../rd-loading/rd-loading.js';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: 'dashboard', component: DashboardComponent }
    ])
  ],
  declarations: [
    DashboardComponent, RdWidgetComponent, RdWidgetBodyComponent, RdWidgetFooterComponent, RdWidgetHeaderComponent, RdLoading
  ]
})
export class DashboardModule {}
