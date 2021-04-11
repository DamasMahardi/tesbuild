import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'attendance',
        loadChildren: () => import('@app-pages/main/human-resource/employee-attendance/attendance.module').then(m => m.AttendancePageModule)
      },
      {
        path: 'attendance-sehat',
        loadChildren: () => import('@app-pages/main/human-resource/employee-attendance-sehats/attendance-sehat/attendance-sehat.module').then(m => m.AttendanceSehatPageModule)
      },
      {
        path: 'attendance-recognition',
        loadChildren: () => import('@app-pages/main/human-resource/employee-attendance-sehats/attendance-recognition/attendance-recognition.module').then(m => m.AttendanceRecognitionPageModule)
      },
      {
        path: 'leave',
        loadChildren: () => import('@app-pages/main/human-resource/employee-leaves/leave.module').then(m => m.LeavePageModule)
      },
      {
        path: 'overtime',
        loadChildren: () => import('@app-pages/main/human-resource/employee-overtimes/overtime.module').then(m => m.OvertimePageModule)
      },
      {
        path: 'payroll',
        loadChildren: () => import('@app-pages/main/human-resource/employee-payrolls/payroll.module').then(m => m.PayrollPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HumanResourcesModule { }
