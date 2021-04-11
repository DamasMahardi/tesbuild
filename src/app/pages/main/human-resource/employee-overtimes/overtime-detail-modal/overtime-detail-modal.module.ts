import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OvertimeDetailModalPageRoutingModule } from './overtime-detail-modal-routing.module';

import { OvertimeDetailModalPage } from './overtime-detail-modal.page';
import { AddEmployeePageModule } from '../add-employee/add-employee.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OvertimeDetailModalPageRoutingModule,
    ReactiveFormsModule,
    AddEmployeePageModule
  ],
  declarations: [OvertimeDetailModalPage]
})
export class OvertimeDetailModalPageModule {}
