import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeaveDetailPage } from './leave-detail.page';

const routes: Routes = [
  {
    path: '',
    component: LeaveDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeaveDetailPageRoutingModule {}
