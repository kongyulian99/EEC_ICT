import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GiamsatComponent } from './giamsat/giamsat.component';

const routes: Routes = [
  {
    path: '',
    component: GiamsatComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
