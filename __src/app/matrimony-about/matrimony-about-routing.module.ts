import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MatrimonyAboutPage } from './matrimony-about.page';

const routes: Routes = [
  {
    path: '',
    component: MatrimonyAboutPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MatrimonyAboutPageRoutingModule {}
