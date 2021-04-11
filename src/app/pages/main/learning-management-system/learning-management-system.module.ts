import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'course',
        loadChildren: () => import('@app-pages/main/learning-management-system/employee-course/course.module').then(m => m.CoursePageModule)
      },
      {
        path: 'file',
        loadChildren: () => import('@app-pages/main/learning-management-system/employee-file/file.module').then(m => m.FilePageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LearningManagementSystemModule { }
