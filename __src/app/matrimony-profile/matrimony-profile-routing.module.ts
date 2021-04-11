import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MatrimonyProfilePage } from './matrimony-profile.page';

const routes: Routes = [
  {
    path: '',
    component: MatrimonyProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MatrimonyProfilePageRoutingModule {}
