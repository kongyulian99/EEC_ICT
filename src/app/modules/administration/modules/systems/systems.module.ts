import { LogsComponent } from './components/logs/logs.component';
import { ComponentsSharedModule } from './../../../../shared/components/components-shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './components/users/users.component';
import { FunctionsComponent } from './components/functions/functions.component';
import { RolesComponent } from './components/roles/roles.component';
import { PermissionsComponent } from './components/permissions/permissions.component';
import { SystemsRoutingModule } from './systems-routing.module';
import { FormUserDetailComponent } from './components/users/form-user-detail/form-user-detail.component';
import { DxButtonModule, DxCheckBoxModule, DxDataGridModule, DxListModule, DxLoadPanelModule, DxNumberBoxModule, DxPopupModule, DxRadioGroupModule, DxScrollViewModule, DxSelectBoxModule, DxTabPanelModule, DxTextAreaModule, DxTextBoxModule, DxToolbarModule, DxTreeListModule, DxValidationGroupModule, DxValidatorModule, DxDateBoxModule, DxValidationSummaryModule } from 'devextreme-angular';
import { FormRoleDetailComponent } from './components/roles/form-role-detail/form-role-detail.component';
import { FormFunctionDetailComponent } from './components/functions/form-function-detail/form-function-detail.component';

@NgModule({
  declarations: [
    UsersComponent,
    FunctionsComponent,
    RolesComponent,
    PermissionsComponent,
    FormUserDetailComponent,
    FormRoleDetailComponent,
    FormFunctionDetailComponent,
    LogsComponent,
  ],
  imports: [
    CommonModule,
    SystemsRoutingModule,
    ComponentsSharedModule,
        //3rd
    DxButtonModule,
    DxTextBoxModule,
    DxNumberBoxModule,
    DxToolbarModule,
    DxDataGridModule,
    DxSelectBoxModule,
    DxScrollViewModule,
    DxTextAreaModule,
    DxValidationGroupModule,
    DxValidatorModule,
    DxLoadPanelModule,
    DxTreeListModule,
    DxPopupModule,
    DxCheckBoxModule,
    DxRadioGroupModule,
    DxTabPanelModule,
    DxPopupModule,
    DxListModule,
    DxDateBoxModule,
    DxValidationSummaryModule
  ]
})
export class SystemsModule { }
