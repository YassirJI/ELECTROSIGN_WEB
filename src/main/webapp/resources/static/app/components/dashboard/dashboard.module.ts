import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';  
import { FormsModule } from '@angular/forms';

import { DashboardComponent } from './dashboard.component.js';
import { DashboardListComponent } from './dashboard-list.component.js';
import { RdWidgetComponent } from '../rd-widget/widget.component.js';
import { RdWidgetBodyComponent } from '../rd-widget-body/widget-body.component.js';
import { RdWidgetHeaderComponent } from '../rd-widget-header/widget-header.component.js';
import { RdWidgetFooterComponent } from '../rd-widget-footer/widget-footer.component.js';
import { DashboardFilterPipe } from './dashboard-filter.pipe.js';
import { DashboardService } from './dashboard.service.js';
import { DashletService } from './dashlet.service.js';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: 'dashboard', component: DashboardComponent },
      { path: 'dashboards', component: DashboardListComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
    ])
  ],
  declarations: [
    DashboardComponent, 
    DashboardListComponent,  
    DashboardFilterPipe, 
    RdWidgetComponent, 
    RdWidgetBodyComponent, 
    RdWidgetFooterComponent, 
    RdWidgetHeaderComponent
  ],
  providers: [
    DashboardService,
    DashletService
  ]
})
export class DashboardModule {}
