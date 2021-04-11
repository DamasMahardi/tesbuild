import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { SalesActivityPage } from './sales-activity.page';
import { SalesActivityRoutingModule } from './sales-activity-routing.module';
import { CustomerPage } from './customer/customer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    SalesActivityRoutingModule
  ],
  declarations: [
    SalesActivityPage,
    CustomerPage
  ],
  entryComponents: [
    CustomerPage
  ]
})
export class SalesActivityPageModule {}