import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuizRoutingModule } from './quiz-routing.module';
import { QuizComponent } from './quiz.component';
import { DxButtonModule, DxRadioGroupModule, DxScrollViewModule, DxSelectBoxComponent, DxSelectBoxModule, DxTextBoxModule, DxToolbarModule } from 'devextreme-angular';
import { ComponentsSharedModule } from 'src/app/shared';
import { QuizPrepareComponent } from './quiz-prepare/quiz-prepare.component';
import { QuizTestComponent } from './quiz-test/quiz-test.component';

@NgModule({
  declarations: [
    QuizComponent,
    QuizPrepareComponent,
    QuizTestComponent
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
    ComponentsSharedModule
  ]
})
export class QuizModule { }
