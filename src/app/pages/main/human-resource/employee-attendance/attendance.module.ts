import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { AttendancePageRoutingModule } from './attendance-routing.module';
import { AttendancePage } from './attendance.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    AttendancePageRoutingModule,
  ],
  declarations: [AttendancePage]
})
export class AttendancePageModule {}
