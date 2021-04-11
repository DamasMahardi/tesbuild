import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilService } from '@app/services/util.service';
import { EmployeeLeave, EmployeeLeaveDetail, EmployeeInformation } from '@app-models';
import { LeaveService } from '../leave.service';
import { ActivatedRoute } from '@angular/router';
import { LeaveType } from '@app-store/enums/leave-type';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';

@Component({
  selector: 'app-leave-detail',
  templateUrl: './leave-detail.page.html',
  styleUrls: ['./leave-detail.page.scss'],
})
export class LeaveDetailPage implements OnInit {

  pageType = null;
  title = null;
  form: FormGroup;
  leave: EmployeeLeave = new EmployeeLeave();
  leaveType = LeaveType;
  dateList: any[] = [];
  dateSelected: any[] = [];
  leaveTypeList = [
    "None",
    "Annual",
    "Sabbatical",
    "Sick",
    "Menstrual",
    "Maternity",
    "Paternity",
    "Umrah",
    "Hajj",
    "Marriage",
    "Child Marriage",
    "Child Khitan",
    "Family Died",
    "Call By Authorities",
    "Come Too Late",
    "Home Early",
    "Out Of Office",
    "Overseas",
    "Permission",
    "Unpaid"
  ]

  constructor(
    private activeRoute: ActivatedRoute,
    private navCtrl: NavController,
    private fb: FormBuilder,
    private utilService: UtilService,
    private leaveService: LeaveService,
    private storage: Storage
  ) {
    this.buildForm();
  }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe((snapshot) => {
      this.pageType = snapshot.pageType;
      this.title = snapshot.title;
      this.leave = snapshot.data.employeeLeave;
      this.buildForm();
    });
  }

  buildForm() {
    this.form = this.fb.group({
      number: [this.leave.number, Validators.required],
      leaveType: [this.leave.leaveType, Validators.required],
      description: ['', Validators.required],
      file: [''],
      fileName: [''],
    });

    this.formDisable(['number']);
    this.dateGenerator(90);
  }

  formDisable(formControl: string[]) {
    formControl.forEach((control) => {
      this.form.get(control).disable();
    });
  }

  dateGenerator(range: number) {
    this.dateList = [];
    let dayWork = range;
    for (let i = 0; i < dayWork; i++) {
      let today = moment().subtract(30, 'days').toDate();
      let date = new Date(today.setDate(today.getDate() + i));
      if (date.getDay() === 0) {
        dayWork++;
      } else {
        this.dateList.push({
          date: new Date(date),
          disable: false
        });
      }
    }
  }

  changeDate(event: any[]) {
    this.dateSelected = event;
  }

  removeDate(index: number) {
    this.dateSelected.splice(index, 1);
  }

  create() {
    if (this.form.invalid) {
      return;
    }

    if (this.dateSelected.length == 0) {
      this.utilService.toast('Please select date !', 'top', 3500);
      return;
    }

    this.leave.leaveType = this.form.value.leaveType;
    this.leave.description = this.form.value.description;
    this.leave.comment = this.leave.description;
    this.leave['employeeLeaveDetails'] = [];
    this.dateSelected.forEach(date => {
      let detail = new EmployeeLeaveDetail({
        dateTime: date
      });
      this.leave.employeeLeaveDetails.push(detail);
    });

    this.utilService.loadingPresent('Please wait...')
    .then(() => {
      this.leaveService.add(this.leave).subscribe(() => {
        this.utilService.loadingDismiss();
        this.navCtrl.navigateForward('/main/human-resources/leave');
      }, () => {
        this.utilService.loadingDismiss();
        this.utilService.toast('Leave request failed !', 'top');
      });
    });
  }

  addAttachment(file: FileList) {
    if(file.length > 0) {
      
      if((file.item(0).size / 1024) > 210) { return this.utilService.toast('Size more than 200 kb not allowed !!', 'top'); }
      
      let reader = new FileReader();
      reader.readAsDataURL(file.item(0));
      reader.onload = (event: any) => {
        let attach = event.target.result;
        this.leave.file = attach;
        this.leave.fileName = file.item(0).name;
        this.form.get('file').setValue(attach);
        this.form.get('fileName').setValue(file.item(0).name);
      };
    }
  }

  removeFile() {
    this.leave.file = "";
    this.leave.fileName = "";
    this.form.get('file').setValue("");
    this.form.get('fileName').setValue("");
  }
}
