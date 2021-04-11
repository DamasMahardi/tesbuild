import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { SetPreferencePageRoutingModule } from './set-preference-routing.module';

import { SetPreferencePage } from './set-preference.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
	TranslateModule,
    SetPreferencePageRoutingModule
  ],
  declarations: [SetPreferencePage]
})
export class SetPreferencePageModule {}
