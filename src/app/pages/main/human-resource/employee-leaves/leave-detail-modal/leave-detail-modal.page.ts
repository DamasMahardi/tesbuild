import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { UtilService } from '@app/services/util.service';
import * as moment from 'moment';
import { EmployeeLeaveDetail } from '@app-models';
import { LeaveType } from '@app-store/enums/leave-type';

@Component({
  selector: 'app-leave-detail-modal',
  templateUrl: './leave-detail-modal.page.html',
  styleUrls: ['./leave-detail-modal.page.scss'],
})
export class LeaveDetailModalPage implements OnInit {

  dateList: any[] = [];
  dateSelected: any[] = [];
  dateListSelected : any[] = [];
  addLeaveDetailList : any[] = [];

  leaveDetailList: any[] = [];

  leaveType = LeaveType;
  leaveTypeList = Object.keys(LeaveType).filter(
    leaveType => typeof this.leaveType[leaveType] === 'number'
  );

  leaveSelected : number;

  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private utilService: UtilService
  ) { }

  ngOnInit() {
    let routerSnapshot = this.navParams.data,
      dateSnapshot = routerSnapshot.addLeaveDetailList;
    this.dateSelected = routerSnapshot.addLeaveDetailList;


    let dayWork = 7;
    let dateList = [];
    for (let i = 0; i < dayWork; i++) {
      let today = new Date(moment().add(2, 'days')["_d"]);
      let date = new Date(today.setDate(today.getDate() + i));
      if (date.getDay() === 0) {
        dayWork++;
      } else {
        dateList.push(new Date(date));

        if (i === (dayWork - 1)) {
          if (dateSnapshot.length === 0) {
            this.dateList = dateList;
          } else {
            if(dateList.length === dateSnapshot.length) {
              this.dateList = [];
            } else {
              for (let j = 0; j < dateList.length; j++) {
                for (let k = 0; k < dateSnapshot.length; k++) {
                  if (moment(dateList[j]).format("DD") === moment(dateSnapshot[k].dateTimeStart).format("DD")) {
                    dateList.splice(j, 1);
                    this.dateList = dateList;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  changeLeave(event: any) {
    this.leaveSelected = event;
  }

  changeDate(event: any) {
    this.dateListSelected = event;
  }

  addDateList() {
    if(this.leaveSelected === undefined) {
      this.utilService.toast('Anda belum memilih tipe cuti !', 'top');
      return;
    }

    if(this.dateListSelected.length === 0) {
      this.utilService.toast('Anda belum memilih tanggal cuti !', 'top');
      return;
    }

    for (let i = 0; i < this.dateListSelected.length; i++) {
      let leaveDetails = new EmployeeLeaveDetail();
      leaveDetails.dateTime = this.dateListSelected[i];
      leaveDetails.leaveDetailStatus = 0;
      this.addLeaveDetailList.push(leaveDetails);
      
      if (i === (this.dateListSelected.length - 1)) {
        this.modalCtrl.dismiss({
          leaveType: this.leaveSelected,
          addLeaveDetailList : this.addLeaveDetailList
        });
      }
    }
  }

  modalDismiss() {
    this.modalCtrl.dismiss();
  }

}
