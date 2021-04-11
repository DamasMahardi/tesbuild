import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MatrimonialpopupPage } from './matrimonialpopup.page';

const routes: Routes = [
  {
    path: '',
    component: MatrimonialpopupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MatrimonialpopupPageRoutingModule {}
