import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DMcauhoiComponent } from './dm-cauhoi/dm-cauhoi.component';

const routes: Routes = [
  {
    path: 'cauhoi',
    component: DMcauhoiComponent,
  },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CategoriesRoutingModule { }
