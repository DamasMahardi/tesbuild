import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeaveDetailModalPage } from './leave-detail-modal.page';

const routes: Routes = [
  {
    path: '',
    component: LeaveDetailModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeaveDetailModalPageRoutingModule {}
