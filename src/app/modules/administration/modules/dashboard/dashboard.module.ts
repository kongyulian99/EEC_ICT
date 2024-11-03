import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { GiamsatComponent } from './giamsat/giamsat.component';
import { DxScrollViewModule } from 'devextreme-angular';


@NgModule({
  declarations: [
    GiamsatComponent
  ],
  imports: [
    CommonModule,
    DxScrollViewModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
