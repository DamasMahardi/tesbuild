import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectRelationPage } from './select-relation.page';

const routes: Routes = [
  {
    path: '',
    component: SelectRelationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectRelationPageRoutingModule {}
