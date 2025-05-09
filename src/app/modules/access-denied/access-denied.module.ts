import { AccessDeniedRoutingModule } from './access-denied-routing.module';
import { AccessDeniedComponent } from './access-denied.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [AccessDeniedComponent],
  imports: [
    CommonModule,
    AccessDeniedRoutingModule
  ]
})
export class AccessDeniedModule { }
