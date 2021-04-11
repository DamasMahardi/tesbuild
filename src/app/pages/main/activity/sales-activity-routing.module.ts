import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalesActivityPage } from './sales-activity.page';

const routes: Routes = [
  {
    path: '',
    component: SalesActivityPage
  },
  {
    path: 'sales-activity-detail',
    loadChildren: () => import('./sales-activity-detail/sales-activity-detail.module').then( m => m.SalesActivityDetailPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalesActivityRoutingModule {}