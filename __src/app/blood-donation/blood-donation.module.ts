import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { BloodDonationPageRoutingModule } from './blood-donation-routing.module';

import { BloodDonationPage } from './blood-donation.page';

@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    IonicModule,
	TranslateModule,
    BloodDonationPageRoutingModule
  ],
  declarations: [BloodDonationPage]
})
export class BloodDonationPageModule {}
