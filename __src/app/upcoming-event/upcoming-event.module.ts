import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { UpcomingEventPageRoutingModule } from './upcoming-event-routing.module';

import { UpcomingEventPage } from './upcoming-event.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
	TranslateModule,
    UpcomingEventPageRoutingModule
  ],
  declarations: [UpcomingEventPage]
})
export class UpcomingEventPageModule {}
