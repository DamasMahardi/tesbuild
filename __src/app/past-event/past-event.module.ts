import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
	
import { IonicModule } from '@ionic/angular';

import { PastEventPageRoutingModule } from './past-event-routing.module';

import { PastEventPage } from './past-event.page';

@NgModule({
  imports: [ 
    CommonModule,
    FormsModule,
    IonicModule,
	TranslateModule,
    PastEventPageRoutingModule
  ],
  declarations: [PastEventPage]
})
export class PastEventPageModule {}
