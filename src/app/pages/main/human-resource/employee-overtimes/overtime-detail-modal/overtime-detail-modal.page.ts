import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { UtilService } from '@app/services/util.service';
import { EmployeeInformation, OvertimeDetail } from '@app-models';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { AddEmployeePage } from '../add-employee/add-employee.page';

@Component({
  selector: 'app-overtime-detail-modal',
  templateUrl: './overtime-detail-modal.page.html',
  styleUrls: ['./overtime-detail-modal.page.scss'],
})
export class OvertimeDetailModalPage implements OnInit {

  addOvertimeDetailList: any[] = [];
  overtimeDetailSnapshot: any[] = [];
  form: FormGroup;
  minDate: any; //moment().format('YYYY-MM-DD');
  maxDate: any; //moment().add(7, 'days').format('YYYY-MM-DD');
  maxDateEnd: any;
  minDateEnd: any;
  employee: EmployeeInformation;

  employeeSelected: any[] = [];

  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private utilService: UtilService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    let routerSnapshot = this.navParams.data;
    this.employee = new EmployeeInformation(routerSnapshot.employee);
    this.overtimeDetailSnapshot = routerSnapshot.overtimeDetailSnapshot;
    this.addOvertimeDetailList = routerSnapshot.overtimeDetailSnapshot || [];

    this.minDate = moment().format('YYYY-MM-DD');
    this.maxDate = moment().add(7, 'days').format('YYYY-MM-DD');

    // if (this.overtimeDetailSnapshot.length > 0) {
    //   this.minDate = moment(this.overtimeDetailSnapshot[this.overtimeDetailSnapshot.length - 1].dateTimeEnd).add(1, 'day').format('YYYY-MM-DD');
    //   this.maxDate = moment().add(7, 'days').format('YYYY-MM-DD');
    // } else {
    //   this.minDate = moment().format('YYYY-MM-DD');
    //   this.maxDate = moment().add(7, 'days').format('YYYY-MM-DD');
    // }

    this.form = this.formBuilder.group({
      dateTimeStart: ['', Validators.compose([Validators.required])],
      dateTimeEnd: ['', Validators.compose([Validators.required])],
      employee: [[]]
    });
  }

  dateStart(date: any) {
    this.form.get('dateTimeEnd').setValue("");
    this.minDateEnd = moment(date).add(1, 'hour').format('YYYY-MM-DDTHH:mm:ss.SSSZ');
    this.maxDateEnd = moment(date).add(1, 'days').format('YYYY-MM-DD'); //moment(date).format('YYYY-MM-DD');
    // let maxDate = moment().add(7, 'days').format('YYYY-MM-DD');
    // if(moment(date).format('YYYY-MM-DD') === maxDate) {
    //   this.maxDateEnd = moment(date).format('YYYY-MM-DD')
    // } else {
    //   this.maxDateEnd = moment(date).add(1, 'days').format('YYYY-MM-DD'); //moment(date).format('YYYY-MM-DD');
    // }
  }

  dateEnd(date: any) {
    console.log();
  }

  async addEmployee() {
    let modal = await this.modalCtrl.create({
      component: AddEmployeePage,
      componentProps : {
        employeeSelected : this.employeeSelected
      }
    });
    modal.present();

    let data = await modal.onWillDismiss();
    if(data.data) {
      this.employeeSelected = data.data.employeeSelected;
    }
  }

  add() {
    if (this.form.invalid) {
      console.log('invalid')
      return;
    }

    let addOvertimeDetailList = [];
    if (this.employeeSelected.length > 0) {
      for (let i = 0; i < this.employeeSelected.length; i++) {
        let overtimeDetail = new OvertimeDetail();
        overtimeDetail.employeeId = this.employeeSelected[i].id;
        overtimeDetail.dateTimeStart = this.form.value.dateTimeStart;
        overtimeDetail.dateTimeEnd = this.form.value.dateTimeEnd;
        overtimeDetail.lengthHours = new Date(this.form.value.dateTimeEnd).getHours() - 1;
        overtimeDetail.actualDateTimeStart = this.form.value.dateTimeStart;
        overtimeDetail.actualDateTimeEnd = this.form.value.dateTimeEnd;
        overtimeDetail.isWeekDay = new Date().getDay() === 0 ? true : false;
        overtimeDetail.isFriday = new Date().getDay() === 5 ? true : false;
        overtimeDetail.workDays = 5;
        overtimeDetail.isEmployeeApproved = true;
        overtimeDetail["employee"] = this.employeeSelected[i]

        addOvertimeDetailList.push(overtimeDetail);
        if (i === (this.employeeSelected.length - 1)) {
          for (let j = 0; j < addOvertimeDetailList.length; j++) {
            this.addOvertimeDetailList.push(addOvertimeDetailList[j]);
            if (j === (addOvertimeDetailList.length - 1)) {
              this.modalCtrl.dismiss({
                addOvertimeDetailList: this.addOvertimeDetailList
              });
            }
          }
        }
      }
    } else {
      let overtimeDetail = new OvertimeDetail();
      overtimeDetail.employeeId = this.employee.id;
      overtimeDetail.dateTimeStart = this.form.value.dateTimeStart;
      overtimeDetail.dateTimeEnd = this.form.value.dateTimeEnd;
      overtimeDetail.lengthHours = new Date(this.form.value.dateTimeEnd).getHours() - 1;
      overtimeDetail.actualDateTimeStart = this.form.value.dateTimeStart;
      overtimeDetail.actualDateTimeEnd = this.form.value.dateTimeEnd;
      overtimeDetail.isWeekDay = new Date().getDay() === 0 ? true : false;
      overtimeDetail.isFriday = new Date().getDay() === 5 ? true : false;
      overtimeDetail.workDays = 5;
      overtimeDetail.isEmployeeApproved = true;
      overtimeDetail["employee"] = this.employee;

      addOvertimeDetailList.push(overtimeDetail);
      for (let j = 0; j < addOvertimeDetailList.length; j++) {
        this.addOvertimeDetailList.push(addOvertimeDetailList[j])
        if (j === (addOvertimeDetailList.length - 1)) {
          this.modalCtrl.dismiss({
            addOvertimeDetailList: this.addOvertimeDetailList
          });
        }
      }
    }
  }

  modalDismiss() {
    this.modalCtrl.dismiss();
  }

}
