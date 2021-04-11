import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OvertimePage } from './overtime.page';

const routes: Routes = [
  {
    path: '',
    component: OvertimePage
  },
  {
    path: 'overtime-detail',
    loadChildren: () => import('./overtime-detail/overtime-detail.module').then( m => m.OvertimeDetailPageModule)
  },
  {
    path: 'overtime-detail-modal',
    loadChildren: () => import('./overtime-detail-modal/overtime-detail-modal.module').then( m => m.OvertimeDetailModalPageModule)
  },
  {
    path: 'add-employee',
    loadChildren: () => import('./add-employee/add-employee.module').then( m => m.AddEmployeePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OvertimePageRoutingModule {}
