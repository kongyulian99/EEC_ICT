import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfoComponent } from './user-info.component';
import { UserInfoRoutingModule } from './user-info-routing.module';
import { DxButtonModule, DxDateBoxModule, DxSelectBoxModule, DxTextBoxModule, DxToolbarModule, DxValidatorModule } from 'devextreme-angular';



@NgModule({
  declarations: [
    UserInfoComponent
  ],
  imports: [
    CommonModule,
    UserInfoRoutingModule,

    DxButtonModule,
    DxTextBoxModule,
    DxToolbarModule,
    DxValidatorModule,
    DxDateBoxModule,
    DxSelectBoxModule
  ]
})
export class UserInfoModule { }
