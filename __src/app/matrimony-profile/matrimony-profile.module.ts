import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { MatrimonyProfilePageRoutingModule } from './matrimony-profile-routing.module';

import { MatrimonyProfilePage } from './matrimony-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    MatrimonyProfilePageRoutingModule
  ],
  declarations: [MatrimonyProfilePage]
})
export class MatrimonyProfilePageModule {}
