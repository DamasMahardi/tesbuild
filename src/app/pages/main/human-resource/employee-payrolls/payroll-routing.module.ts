import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PayrollPage } from './payroll.page';

const routes: Routes = [
  {
    path: '',
    component: PayrollPage
  },
  {
    path: 'payroll-detail',
    loadChildren: () => import('./payroll-detail/payroll-detail.module').then( m => m.PayrollDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PayrollPageRoutingModule {}
