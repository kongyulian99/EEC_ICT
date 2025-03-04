import {
  DxButtonModule,
  DxTextBoxModule,
  DxTextAreaModule,
  DxSelectBoxModule,
  DxToolbarModule,
  DxScrollViewModule,
  DxPopupModule,
  DxTreeViewModule,
  DxDateBoxModule,
  DxValidatorModule,
  DxValidationGroupModule,
  DxDataGridModule,
  DxTagBoxModule,
  DxTreeListModule,
  DxLoadPanelModule,
  DxCheckBoxModule,
  DxRadioGroupModule,
  DxNumberBoxModule,
  DxDropDownBoxModule,
} from 'devextreme-angular';
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
import { GenericPageComponent } from './generic-page/generic-page.component';
import { CustomCkEditorComponent } from './custom-ckeditor/custom-ckeditor.component';
import { ViewCkeditorComponent } from './view-ckeditor/view-ckeditor.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { RouterModule } from '@angular/router';
import { MultipleChoiceQuestionComponent } from './multiple-choice-question/multiple-choice-question.component';
import { FillingQuestionComponent } from './filling-question/filling-question.component';

@NgModule({
  declarations: [
    PaginatorComponent,
    StepsComponent,
    MultiImagesComponent,
    MoreFilterComponent,
    TopicSelectboxComponent,
    GenericPageComponent,
    CustomCkEditorComponent,
    ViewCkeditorComponent,
    MultipleChoiceQuestionComponent,
    FillingQuestionComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
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
    DxLoadPanelModule,
    DxCheckBoxModule,
    DxRadioGroupModule,
    CKEditorModule,
    DxNumberBoxModule
  ],
  exports: [
    PaginatorComponent,
    StepsComponent,
    MultiImagesComponent,
    MoreFilterComponent,
    TopicSelectboxComponent,
    GenericPageComponent,
    CustomCkEditorComponent,
    ViewCkeditorComponent,
    MultipleChoiceQuestionComponent,
  ],
})
export class ComponentsSharedModule {}
