import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuizRoutingModule } from './quiz-routing.module';
import { QuizComponent } from './quiz.component';
import { DxButtonModule, DxRadioGroupModule, DxScrollViewModule, DxSelectBoxComponent, DxSelectBoxModule, DxToolbarModule } from 'devextreme-angular';
import { KatexModule } from 'ng-katex';

@NgModule({
  declarations: [
    QuizComponent
  ],
  imports: [
    CommonModule,
    QuizRoutingModule,
    DxToolbarModule,
    DxButtonModule,
    DxRadioGroupModule,
    KatexModule,
    DxScrollViewModule,
    DxSelectBoxModule
  ]
})
export class QuizModule { }
