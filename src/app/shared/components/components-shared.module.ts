import { DxButtonModule, DxTextBoxModule, DxTextAreaModule, DxSelectBoxModule, DxToolbarModule, DxScrollViewModule, DxPopupModule, DxTreeViewModule, DxDropDownBoxModule, DxDateBoxModule, DxValidatorModule, DxValidationGroupModule, DxDataGridModule, DxTagBoxModule, DxTreeListModule } from 'devextreme-angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { PaginatorComponent } from './paginator/paginator.component';
import { StepsComponent } from './steps/steps.component';
import { MultiImagesComponent } from './multi-images/multi-images.component';
import { PipesModule } from '../pipes';
import { HttpClientModule } from '@angular/common/http';
import { MoreFilterComponent } from './more-filter/more-filter.component';
import { TopicSelectboxComponent } from './topic-selectbox/topic-selectbox.component';


@NgModule({
  declarations: [
    PaginatorComponent,
    StepsComponent,
    MultiImagesComponent,
    MoreFilterComponent,
    TopicSelectboxComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    NgbPaginationModule,
        // Dev
    DxButtonModule,
    DxTextBoxModule,
    DxTextAreaModule,
    DxSelectBoxModule,
    DxToolbarModule,
    DxSelectBoxModule,
    DxScrollViewModule,
    DxButtonModule,
    DxTextBoxModule,
    DxPopupModule,
    PipesModule,
    DxTreeViewModule,
    DxDataGridModule,
    DxDropDownBoxModule,
    DxDateBoxModule,
    DxValidatorModule,
    DxValidationGroupModule,
    DxTagBoxModule,
    DxValidationGroupModule,
    DxTreeListModule,
    DxDataGridModule
  ],
  exports: [
    PaginatorComponent,
    StepsComponent,
    MultiImagesComponent,
    MoreFilterComponent,
    TopicSelectboxComponent
  ]
})
export class ComponentsSharedModule { }
