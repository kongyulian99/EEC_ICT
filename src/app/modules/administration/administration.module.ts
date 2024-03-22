import { DxButtonModule, DxTextBoxModule, DxValidatorModule, DxValidationGroupModule, DxTreeListModule } from 'devextreme-angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministrationComponent } from './administration.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AdministrationRoutingModule } from './administration-routing.module';
import { NgbDropdownModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalChangePasswordComponent } from './components/modal-change-password/modal-change-password.component';

@NgModule({
  declarations: [
    AdministrationComponent,
    HeaderComponent,
    SidebarComponent,
    ModalChangePasswordComponent
  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    NgbDropdownModule,
    NgbModalModule,
    DxButtonModule,
    DxTextBoxModule,
    DxValidatorModule,
    DxValidationGroupModule,
    DxTreeListModule
  ]
})
export class AdministrationModule { }
