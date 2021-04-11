import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OvertimeDetailPageRoutingModule } from './overtime-detail-routing.module';

import { OvertimeDetailPage } from './overtime-detail.page';
import { OvertimeDetailModalPageModule } from '../overtime-detail-modal/overtime-detail-modal.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OvertimeDetailPageRoutingModule,
    OvertimeDetailModalPageModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [OvertimeDetailPage]
})
export class OvertimeDetailPageModule {}
