import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { GiamsatComponent } from './giamsat/giamsat.component';
import { DxChartModule, DxDataGridModule, DxScrollViewModule, DxSelectBoxModule } from 'devextreme-angular';



@NgModule({
  declarations: [
    GiamsatComponent
  ],
  imports: [
    CommonModule,
    DxScrollViewModule,
    DxChartModule,
    DashboardRoutingModule,
    DxDataGridModule,
    DxSelectBoxModule
  ]
})
export class DashboardModule { }
