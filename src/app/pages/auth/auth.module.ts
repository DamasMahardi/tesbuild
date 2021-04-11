import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
      path: '',
      children: [
        {
            path: 'login',
            loadChildren: () => import('@app-pages/auth/login/login.module').then(m => m.LoginModule)
        },
        {
            path: 'account',
            loadChildren: () => import('@app-pages/auth/account/account.module').then(m => m.AccountPageModule)
        },          
        {
            path: 'profile',
            loadChildren: () => import('@app-pages/auth/profile/profile.module').then(m => m.ProfilePageModule)
        },
        {
          path: 'user-profile',
          loadChildren: () => import('@app-pages/auth/user-profile/user-profile.module').then(m => m.UserProfilePageModule)
        },
        {
          path: 'forgot-password',
          loadChildren: () => import('@app-pages/auth/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
        }
      ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthModule { }
