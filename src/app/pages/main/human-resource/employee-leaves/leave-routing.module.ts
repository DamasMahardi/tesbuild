import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeavePage } from './leave.page';

const routes: Routes = [
  {
    path: '',
    component: LeavePage
  },
  {
    path: 'leave-detail',
    loadChildren: () => import('./leave-detail/leave-detail.module').then( m => m.LeaveDetailPageModule)
  },
  {
    path: 'leave-detail-modal',
    loadChildren: () => import('./leave-detail-modal/leave-detail-modal.module').then( m => m.LeaveDetailModalPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeavePageRoutingModule {}
