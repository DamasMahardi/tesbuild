import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AttendanceRecognitionPage } from './attendance-recognition.page';

const routes: Routes = [
  {
    path: '',
    component: AttendanceRecognitionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttendanceRecognitionPageRoutingModule {}
