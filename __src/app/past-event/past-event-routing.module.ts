import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PastEventPage } from './past-event.page';

const routes: Routes = [
  {
    path: '',
    component: PastEventPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PastEventPageRoutingModule {}
