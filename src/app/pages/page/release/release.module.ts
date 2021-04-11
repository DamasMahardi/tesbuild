import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ReleasePageRoutingModule } from './release-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { ReleasePage } from './release.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ReleasePageRoutingModule
  ],
  declarations: [ReleasePage]
})
export class ReleasePageModule {}
