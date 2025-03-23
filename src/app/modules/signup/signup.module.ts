import { SignupRoutingModule } from './signup-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup.component';
import { DxButtonModule, DxDateBoxModule, DxTextBoxModule, DxValidationGroupModule, DxValidatorModule } from 'devextreme-angular';



@NgModule({
  declarations: [
    SignupComponent
  ],
  imports: [
    CommonModule,
    SignupRoutingModule,
    DxTextBoxModule,
    DxButtonModule,
    DxValidatorModule,
    DxValidationGroupModule,
    DxDateBoxModule
  ]
})
export class SignupModule { }
