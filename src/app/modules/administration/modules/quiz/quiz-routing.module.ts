import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizComponent } from './quiz.component';
import { QuizPrepareComponent } from './quiz-prepare/quiz-prepare.component';
import { QuizTestComponent } from './quiz-test/quiz-test.component';
import { QuizListComponent } from './quiz-list/quiz-list.component';

const routes: Routes = [
  { path: 'list', component: QuizComponent },
  { path: 'prepare/:idDeThi', component: QuizPrepareComponent },
  { path: 'test', component: QuizListComponent },
  { path: 'test/:idDeThi', component: QuizTestComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuizRoutingModule {}
