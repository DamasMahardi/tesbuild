import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { LeaveDetailPageRoutingModule } from './leave-detail-routing.module';

import { LeaveDetailPage } from './leave-detail.page';
import { LeaveDetailModalPageModule } from '../leave-detail-modal/leave-detail-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule,
    LeaveDetailPageRoutingModule,
    LeaveDetailModalPageModule
  ],
  declarations: [LeaveDetailPage]
})
export class LeaveDetailPageModule {}
