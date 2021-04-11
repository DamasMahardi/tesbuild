import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
	
import { IonicModule } from '@ionic/angular';

import { SelectRelationPageRoutingModule } from './select-relation-routing.module';

import { SelectRelationPage } from './select-relation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, 
    IonicModule,
	TranslateModule,
    SelectRelationPageRoutingModule
  ],
  declarations: [SelectRelationPage]
})
export class SelectRelationPageModule {}
