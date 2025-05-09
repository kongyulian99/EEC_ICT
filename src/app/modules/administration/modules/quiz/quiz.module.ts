import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuizRoutingModule } from './quiz-routing.module';
import { QuizComponent } from './quiz.component';
import { DxButtonModule, DxCheckBoxModule, DxDateBoxModule, DxNumberBoxModule, DxPopupModule, DxRadioGroupModule, DxScrollViewModule, DxSelectBoxComponent, DxSelectBoxModule, DxTextAreaModule, DxTextBoxModule, DxToolbarModule, DxValidationGroupModule, DxValidatorModule } from 'devextreme-angular';
import { ComponentsSharedModule } from 'src/app/shared';
import { QuizPrepareComponent } from './quiz-prepare/quiz-prepare.component';
import { QuizTestComponent } from './quiz-test/quiz-test.component';
import { QuizListComponent } from './quiz-list/quiz-list.component';

@NgModule({
  declarations: [
    QuizComponent,
    QuizPrepareComponent,
    QuizTestComponent,
    QuizListComponent
  ],
  imports: [
    CommonModule,
    QuizRoutingModule,
    DxToolbarModule,
    DxButtonModule,
    DxRadioGroupModule,
    DxScrollViewModule,
    DxSelectBoxModule,
    DxTextBoxModule,
    DxPopupModule,
    DxTextAreaModule,
    DxCheckBoxModule,
    DxDateBoxModule,
    DxNumberBoxModule,
    ComponentsSharedModule,
    DxValidationGroupModule,
    DxValidatorModule
  ]
})
export class QuizModule { }
