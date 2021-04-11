import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PayrollDetailPageRoutingModule } from './payroll-detail-routing.module';

import { PayrollDetailPage } from './payroll-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PayrollDetailPageRoutingModule
  ],
  declarations: [PayrollDetailPage]
})
export class PayrollDetailPageModule {}
