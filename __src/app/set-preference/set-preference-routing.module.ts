import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SetPreferencePage } from './set-preference.page';

const routes: Routes = [
  {
    path: '',
    component: SetPreferencePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SetPreferencePageRoutingModule {}
