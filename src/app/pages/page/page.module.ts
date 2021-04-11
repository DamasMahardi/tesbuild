import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'notification',
        loadChildren: () => import('@app-pages/page/notifications/notifications.module').then(m => m.NotificationsPageModule)
      },
      {
        path: 'about',
        loadChildren: () => import('@app-pages/page/about/about.module').then(m => m.AboutPageModule)
      },
      {
        path: 'release',
        loadChildren: () => import('@app-pages/page/release/release.module').then(m => m.ReleasePageModule)
      },
      {
        path: 'landing',
        loadChildren: () => import('@app-pages/page/landing/landing.module').then(m => m.LandingPageModule)
      }
    ]
  },

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageModule { }
