import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { PayrollPageRoutingModule } from './payroll-routing.module';
import { PayrollPage } from './payroll.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    PayrollPageRoutingModule
  ],
  declarations: [PayrollPage]
})
export class PayrollPageModule {}
