import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/page/landing'
  },
  {
    path: 'tabs',
    loadChildren: () => import('@app/navigation/tabs/tabs.module').then(m => m.TabsModule)
  },
  {
    path : 'main',
    loadChildren : () => import('@app-pages/main/main.module').then(m => m.MainModule)
  },{
    path : 'page',
    loadChildren : () => import('@app-pages/page/page.module').then(m => m.PageModule)
  },
  {
    path : 'auth',
    loadChildren : () => import('@app-pages/auth/auth.module').then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
