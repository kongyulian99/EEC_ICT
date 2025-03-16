import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopicTrainingListComponent } from './topic-training-list/topic-training-list.component';

const routes: Routes = [
  {
    path: '',
    component: TopicTrainingListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TopicTrainingRoutingModule { }
