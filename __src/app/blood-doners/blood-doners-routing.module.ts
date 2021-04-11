import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BloodDonersPage } from './blood-doners.page';

const routes: Routes = [
  {
    path: '',
    component: BloodDonersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BloodDonersPageRoutingModule {}
