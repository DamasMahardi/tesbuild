import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BloodDonationPage } from './blood-donation.page';

const routes: Routes = [
  {
    path: '',
    component: BloodDonationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BloodDonationPageRoutingModule {}
