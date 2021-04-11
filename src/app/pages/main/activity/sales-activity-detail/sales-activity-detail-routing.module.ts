import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalesActivityDetailPage } from './sales-activity-detail.page';

const routes: Routes = [
  {
    path: '',
    component: SalesActivityDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalesActivityDetailRoutingModule {}