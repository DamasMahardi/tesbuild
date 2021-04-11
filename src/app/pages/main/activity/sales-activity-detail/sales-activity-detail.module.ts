import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { SalesActivityDetailPage } from './sales-activity-detail.page';
import { SalesActivityDetailRoutingModule } from './sales-activity-detail-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule,
    SalesActivityDetailRoutingModule
  ],
  declarations: [SalesActivityDetailPage]
})
export class SalesActivityDetailPageModule {}