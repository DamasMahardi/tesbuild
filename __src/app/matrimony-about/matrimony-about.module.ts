import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { MatrimonyAboutPageRoutingModule } from './matrimony-about-routing.module';

import { MatrimonyAboutPage } from './matrimony-about.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
	TranslateModule,
    MatrimonyAboutPageRoutingModule
  ],
  declarations: [MatrimonyAboutPage]
})
export class MatrimonyAboutPageModule {}
