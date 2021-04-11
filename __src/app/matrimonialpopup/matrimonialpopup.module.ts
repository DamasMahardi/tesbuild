import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { MatrimonialpopupPageRoutingModule } from './matrimonialpopup-routing.module';

import { MatrimonialpopupPage } from './matrimonialpopup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,  
	TranslateModule,
    MatrimonialpopupPageRoutingModule
  ],
  declarations: [MatrimonialpopupPage]
})
export class MatrimonialpopupPageModule {}
 