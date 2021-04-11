import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { OvertimePageRoutingModule } from './overtime-routing.module';
import { OvertimePage } from './overtime.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    OvertimePageRoutingModule,
  ],
  declarations: [OvertimePage]
})
export class OvertimePageModule {}
