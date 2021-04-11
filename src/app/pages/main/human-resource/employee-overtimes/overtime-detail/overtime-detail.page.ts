import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilService } from '@app/services/util.service';
import { ActivatedRoute } from '@angular/router';
import { OvertimeService } from '../overtime.service';
import { EmployeeInformation, EmployeeOvertime } from '@app-models';
import { OvertimeType } from '@app-store/enums/overtime-type';
import { DaysOfWeek } from '@app-store/enums/DaysOfWeek';
import * as moment from 'moment';
import { AttendanceService } from '../../employee-attendance/attendance.service';

@Component({
  selector: 'app-overtime-detail',
  templateUrl: './overtime-detail.page.html',
  styleUrls: ['./overtime-detail.page.scss'],
})
export class OvertimeDetailPage implements OnInit {

  pageType = null;
  title = null;
  form: FormGroup;
  employee: EmployeeInformation = new EmployeeInformation();
  overtime: EmployeeOvertime = new EmployeeOvertime();
  overtimeType = OvertimeType;
  overtimeTypeList = Object.keys(OvertimeType).filter(
    overtimeType => typeof this.overtimeType[overtimeType] === 'number'
  );
  dayName = DaysOfWeek;
  dayNameList = Object.keys(DaysOfWeek).filter(
    dayName => typeof this.dayName[dayName] === 'number'
  );
  minDate = moment().subtract(40, 'days').format('YYYY-MM-DD');
  maxDate = moment().add(7, 'days').format('YYYY-MM-DD');
  timeStartMin : string = null;
  timeStartMax : string = null;
  timeEndMin : string = null;
  timeEndMax : string = null;
  minDateEnd: string = null;
  maxDateEnd: string = null;
  workShift: any = {};
  todayWorkshift: any = null;
  disabledTimeStart: boolean = true;
  disabledTimeEnd: boolean = true;
  disabledDateEnd: boolean = true;

  constructor(
    private activeRoute: ActivatedRoute,
    private navCtrl: NavController,
    private fb: FormBuilder,
    private utilService: UtilService,
    private overtimeService: OvertimeService,
    private attendanceService: AttendanceService
  ) {
    /**
     * Pseudo Code
     * Update 24/11/2020
     * 
     * Pengajuan lembur dilakukan maksimal 1x24 (H-1) jam dari waktu lembur, ideal dilakukan pada H-7.
     * Jika kurang dari 24 jam approval atasan harus segera approve.
     * Untuk approval lembur pun maksimal 1x24 jam dari waktu pengajuan oleh karyawan yang melaksanakan lembur.
     */
    this.buildForm();
  }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe((snapshot) => {
      this.pageType = snapshot.pageType;
      this.title = snapshot.title;
      this.overtime = snapshot.data.employeeOvertime;
      this.buildForm();
    });
  }

  buildForm() {
    this.form = this.fb.group({
      number: [this.overtime.number],
      dateTimeStart: ['', Validators.compose([Validators.required])],
      dateTimeEnd: ['', Validators.compose([Validators.required])],
      description: ['', Validators.required],
      timeStart: ['', Validators.required],
      timeEnd: ['', Validators.required],
    });

    this.formDisable(['number']);
  }

  formDisable(formControl: string[]) {
    formControl.forEach((control) => {
      this.form.get(control).disable();
    });
  }

  changeDateStart(date: any) {
    this.form.get('timeStart').setValue("");
    this.form.get('timeEnd').setValue("");
    this.form.get('dateTimeEnd').setValue("");
    this.disabledTimeStart = false;
    this.disabledTimeEnd = true;
    this.disabledDateEnd = true;
    this.getEmployeeWorkshift('start', date);
  }

  changeTimeStart() {
    this.disabledTimeEnd = true;
    this.disabledDateEnd = false;
    this.form.get('dateTimeEnd').setValue("");
    this.form.get('timeEnd').setValue("");
  }

  changeDateEnd(date: any) {
    this.disabledTimeEnd = false;
    this.form.get('timeEnd').setValue("");
    this.getTimeWorkshift('end', date);
  }

  /**
   * TODO:
   * 
   * Fungsi ini dilakukan untuk mengecek workshift khususnya karyawan tipe crew / diver dengan workshift yang tidak memiliki pola.
   * Pengajuan workshift bisa dilakukan di tanggal sebelumnya (Back Date), maka dibuat fungsi untuk mengecek workshift.
   * Jika pada tanggal 01/11/2020 karyawan tidak memiliki workshift (OFF DAY),maka jam lembur dibuka bebas, tidak mengacu kepada jam workshift.
   * Tetapi jika ada workshift, maka cek jam akhir workshift dan gunakan jam tersebut untuk awal memulai lembur.
   * kemudian jam awal workshift digunakan untuk akhir lembur.
   */
  getEmployeeWorkshift(type: string, date: any) {
    this.utilService.loadingPresent('Please wait...')
    .then(() => {
      this.attendanceService.getEmployeeWorkshiftByEffectiveDate(
        this.overtime.employeeId, moment(new Date(this.form.value.dateTimeStart)).endOf('days').toISOString()
      ).subscribe((response) => {
        this.workShift = response;
        this.getTimeWorkshift(type, date);
        this.utilService.loadingDismiss();
      }, () => {
        this.utilService.loadingDismiss();
        this.utilService.toast('Failed get a work shift !');
      });
    });
  }

  getTimeWorkshift(type: string, date: any) {    
    if(this.workShift && this.workShift.workshiftDetail.length > 0) {
      let d = new Date(date),
      findWorkshift = this.workShift.workshiftDetail.find(w => w.dayName === d.getDay()),
      timeOut: Date = new Date(findWorkshift.timeOut),
      timeIn: Date = new Date(findWorkshift.timeIn);
  
      if(type === 'start') { // Ketika memilih tanggal mulai
        if(findWorkshift.isActive) {
          if(moment(d.setHours(timeIn.getHours(), timeIn.getMinutes())).isBefore(d.setHours(timeOut.getHours(), timeOut.getMinutes()))) { 
            // Shift Pagi            
            this.minDateEnd = moment(date).add(1, 'hour').format('YYYY-MM-DD');
            this.maxDateEnd = moment(date).add(1, 'days').format('YYYY-MM-DD');
            this.timeStartMin = this.timeGenerator(d, timeOut.getHours(), timeOut.getMinutes());
            this.timeStartMax = this.timeGenerator(d, 23, 59);
          } else { 
            // shift malam
            this.minDateEnd = moment(date).add(1, 'hour').format('YYYY-MM-DD');
            this.maxDateEnd = moment(date).format('YYYY-MM-DD');
            this.timeStartMin = this.timeGenerator(d, timeOut.getHours(), timeOut.getMinutes());
            this.timeStartMax = this.timeGenerator(d, timeIn.getHours() - 1, timeIn.getMinutes());
          }
        } else {
          this.minDateEnd = moment(date).add(1, 'hour').format('YYYY-MM-DD');
          this.maxDateEnd = moment(date).add(1, 'days').format('YYYY-MM-DD');
          this.timeStartMin = this.timeGenerator(d, 0 , 0);
          this.timeStartMax = this.timeGenerator(d, 23 , 59);
        }
      } else { // Ketika memilih tanggal akhir
        let dateTimeStart = new Date(this.form.value.dateTimeStart),
        dateTimeEnd = new Date(date),
        timeStart = new Date(this.form.value.timeStart),
        start = new Date(dateTimeStart.getFullYear(), dateTimeStart.getMonth(), dateTimeStart.getDate()),
        end = new Date(dateTimeEnd.getFullYear(), dateTimeEnd.getMonth(), dateTimeEnd.getDate());
        
        if(moment(dateTimeStart.setHours(timeIn.getHours(), timeIn.getMinutes())).isBefore(dateTimeStart.setHours(timeOut.getHours(), timeOut.getMinutes()))) { 
          // Shift Pagi
          if(moment(start).isBefore(end)) {
            this.timeEndMin = this.timeGenerator(dateTimeEnd, 0, 0);
            this.timeEndMax = this.timeGenerator(dateTimeEnd, timeIn.getHours(), timeIn.getMinutes());
          } else {
            this.timeEndMin = this.timeGenerator(dateTimeEnd, timeStart.getHours() + 1, timeStart.getMinutes());
            this.timeEndMax = this.timeGenerator(dateTimeEnd, 23, 59);
          }
        } else { 
          // Shift Malam
          if(moment(start).isBefore(end)) {
            this.timeEndMin = this.timeGenerator(dateTimeEnd, 0, 0);
            this.timeEndMax = this.timeGenerator(dateTimeEnd, timeOut.getHours(), timeOut.getMinutes());
          } else {
            this.timeEndMin = this.timeGenerator(dateTimeEnd, timeStart.getHours() + 1, timeStart.getMinutes());
            this.timeEndMax = this.timeGenerator(dateTimeEnd, timeIn.getHours(), timeIn.getMinutes());
          }
        }
      }
    } else { // Jika OFF DAY (Crew / Diver)
      let d = new Date(date);
      this.minDateEnd = moment(date).add(1, 'hour').format('YYYY-MM-DD');
      this.maxDateEnd = moment(date).add(1, 'days').format('YYYY-MM-DD');
      if(type === 'start') {
        this.timeStartMin = this.timeGenerator(d, 0, 0);
        this.timeStartMax = this.timeGenerator(d, 23, 59);
      } else {
        let dateTimeStart = new Date(this.form.value.dateTimeStart),
        dateTimeEnd = new Date(date),
        timeStart = new Date(this.form.value.timeStart),
        start = new Date(dateTimeStart.getFullYear(), dateTimeStart.getMonth(), dateTimeStart.getDate()),
        end = new Date(dateTimeEnd.getFullYear(), dateTimeEnd.getMonth(), dateTimeEnd.getDate());
        
        if(moment(start).isBefore(end)) {
          this.timeEndMin = this.timeGenerator(dateTimeEnd, 0, 0);
          this.timeEndMax = this.timeGenerator(dateTimeEnd, 23, 59);
        } else {
          this.timeEndMin = this.timeGenerator(dateTimeEnd, timeStart.getHours() + 1, timeStart.getMinutes());
          this.timeEndMax = this.timeGenerator(dateTimeEnd, 23, 59);
        }
      }
    }
  }

  combineDateTime() {
    let timeStart = new Date(this.form.value.timeStart),
    timeEnd = new Date(this.form.value.timeEnd),
    dateStart = new Date(this.form.value.dateTimeStart),
    dateEnd = new Date(this.form.value.dateTimeEnd),
    dateTimeStart = new Date(dateStart.getFullYear(), dateStart.getMonth(), dateStart.getDate(), timeStart.getHours(), timeStart.getMinutes()),
    dateTimeEnd = new Date(dateEnd.getFullYear(), dateEnd.getMonth(), dateEnd.getDate(), timeEnd.getHours(), timeEnd.getMinutes())
    
    this.overtime.dateTimeStart = dateTimeStart;
    this.overtime.dateTimeEnd = dateTimeEnd;
  }

  create() {
    if (this.form.invalid) {
      return;
    } 

    this.combineDateTime();
    this.overtime.date = new Date();
    this.overtime.description = this.form.value.description;
    this.overtime.overtimeType = this.form.value.overtimeType;
    this.overtime.dayName = new Date().getDay();

    this.utilService.loadingPresent('Please wait...')
    .then(() => {
      this.overtimeService.add(this.overtime).subscribe(() => {
        this.utilService.loadingDismiss();
        this.navCtrl.navigateRoot('/tabs')
          .then(() => {
            this.navCtrl.navigateForward('/main/human-resources/overtime');
          });
        }, (error) => {
          var message = error.error.error.code === "123000321" ? error.error.error.message : "Overtime request failed !";
          this.utilService.loadingDismiss();
          this.utilService.toast(message, 'top');
        });
    });
  }

  timeGenerator(date: Date, hour: number, minute: number) {
    let d = new Date(date);
    return moment(new Date(d.getFullYear(), d.getMonth(), d.getDate(), hour, minute)).format('YYYY-MM-DDTHH:mm:ss.SSSZ');
  }
}
