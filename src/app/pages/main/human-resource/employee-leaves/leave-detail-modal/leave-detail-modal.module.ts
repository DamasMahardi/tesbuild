import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LeaveDetailModalPageRoutingModule } from './leave-detail-modal-routing.module';

import { LeaveDetailModalPage } from './leave-detail-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LeaveDetailModalPageRoutingModule
  ],
  declarations: [LeaveDetailModalPage]
})
export class LeaveDetailModalPageModule {}
