import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DMcauhoiComponent } from './dm-cauhoi/dm-cauhoi.component';
import { DMtopicComponent } from './dm-topic/dm-topic.component';

const routes: Routes = [
  {
    path: 'topic',
    component: DMtopicComponent,
  },
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
