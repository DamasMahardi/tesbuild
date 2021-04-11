import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AttendanceRecognitionPageRoutingModule } from './attendance-recognition-routing.module';

import { AttendanceRecognitionPage } from './attendance-recognition.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AttendanceRecognitionPageRoutingModule
  ],
  declarations: [AttendanceRecognitionPage]
})
export class AttendanceRecognitionPageModule {}
