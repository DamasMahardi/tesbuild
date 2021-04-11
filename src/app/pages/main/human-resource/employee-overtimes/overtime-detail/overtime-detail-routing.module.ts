import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OvertimeDetailPage } from './overtime-detail.page';

const routes: Routes = [
  {
    path: '',
    component: OvertimeDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OvertimeDetailPageRoutingModule {}
