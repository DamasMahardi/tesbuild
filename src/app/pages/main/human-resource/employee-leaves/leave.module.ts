import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { LeavePageRoutingModule } from './leave-routing.module';
import { LeavePage } from './leave.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    LeavePageRoutingModule,
  ],
  declarations: [LeavePage]
})
export class LeavePageModule {}
