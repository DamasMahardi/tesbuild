import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { AddFamilyMemberPageRoutingModule } from './add-family-member-routing.module';

import { AddFamilyMemberPage } from './add-family-member.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
	TranslateModule,
    AddFamilyMemberPageRoutingModule
  ],
  declarations: [AddFamilyMemberPage]
})
export class AddFamilyMemberPageModule {}
