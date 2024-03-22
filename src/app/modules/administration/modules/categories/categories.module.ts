import { DxButtonModule, DxTextBoxModule, DxNumberBoxModule, DxToolbarModule, DxDataGridModule, DxSelectBoxModule, DxScrollViewModule, DxTextAreaModule, DxValidationGroupModule, DxValidatorModule, DxLoadPanelModule, DxTreeListModule, DxPopupModule, DxCheckBoxModule, DxRadioGroupModule, DxTabPanelModule, DxListModule, DxTreeViewModule, DxDropDownBoxModule } from 'devextreme-angular';
import { ComponentsSharedModule } from './../../../../shared/components/components-shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesRoutingModule } from './categories-routing.module';
import { DMcauhoiComponent } from './dm-cauhoi/dm-cauhoi.component';
import { FormCauhoiComponent } from './dm-cauhoi/form-cauhoi/form-cauhoi.component';
import { DMtopicComponent } from './dm-topic/dm-topic.component';
import { FormTopicComponent } from './dm-topic/form-topic/form-topic.component';

@NgModule({
  declarations: [
    DMcauhoiComponent,
    FormCauhoiComponent,
    DMtopicComponent,
    FormTopicComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    ComponentsSharedModule,
    DxCheckBoxModule,
    DxTextBoxModule,
    DxTextAreaModule,
    DxNumberBoxModule,
    DxValidatorModule,
    DxValidationGroupModule,
    DxScrollViewModule,
    DxButtonModule,
    DxLoadPanelModule,
    DxDataGridModule,
    DxTreeListModule,
    DxToolbarModule,
    DxSelectBoxModule,
    DxDropDownBoxModule,
    DxTreeViewModule,
    DxRadioGroupModule
  ]
})
export class CategoriesModule { }

