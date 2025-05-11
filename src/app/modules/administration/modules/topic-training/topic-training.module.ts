import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopicTrainingRoutingModule } from './topic-training-routing.module';
import { TopicTrainingListComponent } from './topic-training-list/topic-training-list.component';
import { TopicCardComponent } from './topic-training-list/topic-card/topic-card.component';
import { DxButtonModule, DxCheckBoxModule, DxTreeViewModule, DxTreeListModule, DxScrollViewModule } from 'devextreme-angular';
import { ComponentsSharedModule } from 'src/app/shared';


@NgModule({
  declarations: [
    TopicTrainingListComponent,
    TopicCardComponent
  ],
  imports: [
    CommonModule,
    TopicTrainingRoutingModule,
    DxButtonModule,
    ComponentsSharedModule,
    DxCheckBoxModule,
    DxTreeViewModule,
    DxTreeListModule,
    DxScrollViewModule
  ]
})
export class TopicTrainingModule { }
