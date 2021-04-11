import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AttendanceSehatPageRoutingModule } from './attendance-sehat-routing.module';

import { AttendanceSehatPage } from './attendance-sehat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AttendanceSehatPageRoutingModule
  ],
  declarations: [AttendanceSehatPage]
})
export class AttendanceSehatPageModule {}
