import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SystemConstants } from 'src/app/shared';
import { AdministrationComponent } from './administration.component';

const routes: Routes = [
  {
    path: '',
    component: AdministrationComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./modules/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'systems',
        loadChildren: () =>
          import('./modules/systems/systems.module').then(
            (m) => m.SystemsModule
          ),
      },
      {
        path: 'categories',
        loadChildren: () =>
          import('./modules/categories/categories.module').then(
            (m) => m.CategoriesModule
          ),
      },
      {
        path: 'quiz',
        loadChildren: () =>
          import('./modules/quiz/quiz.module').then(
            (m) => m.QuizModule
          ),
      },
      {
        path: 'topic-training',
        loadChildren: () =>
          import('./modules/topic-training/topic-training.module').then(
            (m) => m.TopicTrainingModule
          ),
      },
      {
        path: 'user-info',
        loadChildren: () =>
          import('./modules/user-info/user-info.module').then(
            (m) => m.UserInfoModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministrationRoutingModule {}
