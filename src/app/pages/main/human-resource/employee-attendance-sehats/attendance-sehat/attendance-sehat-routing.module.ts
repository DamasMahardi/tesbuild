import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AttendanceSehatPage } from './attendance-sehat.page';

const routes: Routes = [
  {
    path: '',
    component: AttendanceSehatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttendanceSehatPageRoutingModule {}
