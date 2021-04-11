import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { forkJoin } from 'rxjs';
import { NavController, Platform, PopoverController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { AuthService } from '@app/services/auth.service';
import { UtilService } from '@app/services/util.service';
import { EmployeeInformation, EmployeeAttendance, AttendanceByEmployee } from '@app-models';
import { AttendanceService } from './attendance.service';
import { AttendanceStatus } from '@app/store/enums/attendance-status';
import { DaysOfWeek } from '@app/store/enums/DaysOfWeek';
import * as moment from 'moment';
import { NavigationExtras, Router } from '@angular/router';
import { EmployeeAttendanceRequest, EmployeeAttendanceRequestCreateUpdateDto, EmployeeAttendanceRequestWithNavigationProperties, EmployeeWorkshiftWithNavigationProperties } from '@app/store/models/employee-attendance-request.model';
import { ApprovalStatus } from '@app/store/enums';
import { environment } from '@environments/environment.prod';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.page.html',
  styleUrls: ['./attendance.page.scss'],
})
export class AttendancePage implements OnInit {

  employee: EmployeeInformation = new EmployeeInformation();
  attendanceStatussArr = Object.keys(AttendanceStatus).filter(value => isNaN(Number(value)) === false).map(key => ({ key: key, value: AttendanceStatus[key] }));
  dayNameArr = Object.keys(DaysOfWeek).filter(value => isNaN(Number(value)) === false).map(key => ({ key: key, value: DaysOfWeek[key] }));
  attendanceList: any[] = [];
  workshift: any = {};
  todayWorkshift: any = null;
  todayAttendance: any[] = [];
  today: Date = new Date();
  timezoneInfo: string = null;
  timezoneOffset: number = 0;
  deviceTokenId: string = null;
  isRequest: boolean = true;
  isScheduleOff: boolean = false;
  isClockIn: boolean = false;
  isClockOut: boolean = false;
  todayAttendancesByEmployee : AttendanceByEmployee = new AttendanceByEmployee();
  type: string = 'attendance';
  requestList: EmployeeAttendanceRequestWithNavigationProperties[] = [];
  approveList: EmployeeAttendanceRequestWithNavigationProperties[] = [];
  approvalStatus = ["Ask appoval", "Approved", "Rejected"];
  employeeAttendanceReques : EmployeeAttendanceRequest = new EmployeeAttendanceRequest();
  employeeWorkshift : EmployeeWorkshiftWithNavigationProperties[] = [];
  constructor(
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private platform: Platform,
    private authService: AuthService,
    private utilService: UtilService,
    private storage: Storage,
    private attendanceService: AttendanceService,
    private navCtrl: NavController,
    public popoverController: PopoverController,
    private router: Router
  ) {
    this.platform.backButton.subscribe(async() => {
      if(this.router.url === '/main/human-resources/attendance') {
        if(await this.popoverController.getTop()) {
          return this.popoverController.dismiss();
        }
      }
    })
  }

  ngOnInit() {
    
  }

  ionViewWillEnter() {
    this.get();
  }

  get() {
    Promise.all([
      this.storage.get(`hure_${environment.appName}_employee`),
      this.storage.get(`hure_${environment.appName}_timezone_info`),
      this.storage.get(`hure_${environment.appName}_timezone_offset`),
      this.storage.get(`hure_${environment.appName}_deviceTokenId`)
    ]).then(([employee, timezone_info, timezone_offset, deviceTokenId]) => {
      if (employee) {
        this.employee = new EmployeeInformation(employee);
        this.getAttendanceList(this.employee);
        this.attendanceService.getEmployeeWorkshift(this.employee.id, 10)
        .subscribe((data) => {
          this.employeeWorkshift = data['items'];
        });
      } else {
        this.authService.getCurrentEmployeeInformation(this.utilService.guidEmpty(), null)
          .subscribe((employee: any) => {
            this.employee = new EmployeeInformation(employee);
            this.getAttendanceList(this.employee);              
          });
      }
      this.timezoneInfo = timezone_info;
      this.timezoneOffset = timezone_offset;
      this.deviceTokenId = deviceTokenId;
    });
  }

  getAttendanceList(employee: EmployeeInformation) {
    this.utilService.loadingPresent('Please wait...')
    .then(() => {
      forkJoin([
        this.attendanceService.getWorkshift(employee.id),
        this.attendanceService.getByEmployeeId(employee.id, 10),
        this.attendanceService.getAttendanceByEmployee(employee.id)
      ]).subscribe(([workshift, attendanceList, todayAttendancesByEmployee]) => {
          this.attendanceList = attendanceList.items;
          this.workshift = workshift;
          this.getTodayWorkshift(this.workshift.workshiftDetail)
          this.todayAttendance = this.attendanceList.filter((att) => this.isToday(att.employeeAttendance));
          this.utilService.loadingDismiss();
          this.isScheduleOff = this.workshift.workshift ? false : true;
          
          this.todayAttendancesByEmployee = new AttendanceByEmployee(todayAttendancesByEmployee);
          let _todayAttendance = this.isTodayByEmployee(this.todayAttendancesByEmployee) 
                                ? new EmployeeAttendance(this.todayAttendancesByEmployee.employeeAttendance) 
                                : new EmployeeAttendance();
          this.checkScheduleAttendance(_todayAttendance);
      }, () => {
        this.utilService.loadingDismiss();
      });
    })
  }

  checkAttendanceLatestById(employeeAttendance: EmployeeAttendance): boolean {
    return employeeAttendance.id === this.todayAttendancesByEmployee.employeeAttendance.id;
  }

  checkLatestAttendance() : boolean {
    let dateMin = moment().subtract(1, 'days'),
        dateMax = moment(),
        day = moment(this.todayAttendancesByEmployee.employeeAttendance.date);
    return day > dateMin && day < dateMax;
  }

  checkScheduleAttendance(todayAttendance: EmployeeAttendance) {
    let checkLatestAttendance = this.checkLatestAttendance();
    let today = new Date();
    
    if(this.todayAttendancesByEmployee.employeeAttendance.id === null)
    {
      // CLOCK IN
      // Kondisi ini jika karyawan belum pernah melakukan absen / untuk karyawan baru
      // console.log('CLOCK IN');
      this.isClockIn = true;
      this.isClockOut = false;
    } 
    else if(checkLatestAttendance === false && this.todayAttendancesByEmployee.employeeAttendance.id !== null
    ) {
      // CLOCK IN
      // console.log('CLOCK IN');
      this.isClockIn = true;
      this.isClockOut = false;
    } 
    else if(checkLatestAttendance === true
      && this.todayAttendancesByEmployee.employeeAttendance.id !== null
      && this.todayAttendancesByEmployee.employeeAttendance.dateTimeOut !== null
      && today.getHours() <= (new Date(this.todayAttendancesByEmployee.workShiftDetail.timeIn).getHours() - 3)
    ) {
      // Belum waktunya clock in
      // console.log('Belum waktunya clock in');
      this.isClockIn = false;
      this.isClockOut = false;
    }
    else if(this.todayAttendancesByEmployee.employeeAttendance.dateTimeOut !== null 
      && todayAttendance.id === null) 
    {
      // CLOCK IN
      // Kondisi jika karyawan sudah melakukan absen masuk (kemarin)
      // console.log('CLOCK IN');
      this.isClockIn = true;
      this.isClockOut = false;
    }
    else if(today.getHours() >= (new Date(this.todayAttendancesByEmployee.workShiftDetail.timeIn).getHours() - 3) 
      && todayAttendance.id === null)
    {
      // CLOCK IN
      // console.log('CLOCK IN');
      this.isClockIn = true;
      this.isClockOut = false;
    }
    else if(this.todayAttendancesByEmployee.employeeAttendance.dateTimeIn !== null
      && this.todayAttendancesByEmployee.employeeAttendance.dateTimeOut === null)
    {
      // CLOCK OUT
      // console.log('CLOCK OUT');
      this.isClockOut = true;
      this.isClockIn = false;
    }
    else {
      // Sudah clock in dan clock out
      // console.log('Sudah clock in dan clock out');
      this.isClockIn = false;
      this.isClockOut = false;
    }
  }

  clockIn() {   
    this.attendanceService.getToday(this.employee.id)
      .subscribe((attendance: any) => {
        let att = attendance 
          ? new EmployeeAttendance(attendance.EmployeeAttendance) 
          : new EmployeeAttendance();    
        if (this.platform.is('cordova')) {
          this.getNativeLocation(att);
        } else {
          this.getWebLocation(att);
        }
    });
  } 
  
  clockOut(att: EmployeeAttendance) {
    if (this.platform.is('cordova')) {
      this.getNativeLocation(att);
    } else {
      this.getWebLocation(att);
    }
  }

  getNativeLocation(att: EmployeeAttendance) {
    this.utilService.loadingPresent('Please wait...')
    .then(() => {
      this.geolocation.getCurrentPosition()
      .then((geo) => { 
        this.nativeGeocoder.reverseGeocode(geo.coords.latitude, geo.coords.longitude, {
          useLocale: true,
          maxResults: 5
        }).then((geocode: NativeGeocoderResult[]) => {
          this.utilService.loadingDismiss();
          const location = geocode[0];
          const address = `${location.thoroughfare} ${location.subThoroughfare}, ${location.subLocality}, ${location.locality}, 
          ${location.subAdministrativeArea}, ${location.administrativeArea} ${location.postalCode}, 
          ${location.countryName}`;
          if (att.id === null) {
            att.latIn = location.latitude;
            att.lngIn = location.longitude;
            att.locationIn = address;
          } else {
            att.latOut = location.latitude;
            att.lngOut = location.longitude;
            att.locationOut = address;
          }
          this.attendance(att);        
        }).catch(() => {
          this.utilService.loadingDismiss();
          this.utilService.toast('Get location failed !');
        });
      });
    });
  }  

  getWebLocation(att: EmployeeAttendance) {
    this.utilService.loadingPresent('Please wait...')
    .then(() => {
      navigator.geolocation.getCurrentPosition((geo) => {
        this.attendanceService.getWebLocation(geo)
          .subscribe((geocode: any) => {
            this.utilService.loadingDismiss();
            const location = geocode.results[0];
            const address = location.formatted_address;
            if (att.id === null) {
              att.latIn = location.geometry.location.lat;
              att.lngIn = location.geometry.location.lng;
              att.locationIn = address;
            } else {
              att.latOut = location.geometry.location.lat;
              att.lngOut = location.geometry.location.lng;
              att.locationOut = address;
            }          
            this.attendance(att); 
          }, () => {
            this.utilService.loadingDismiss();
            this.utilService.toast('Get location failed !');
          });
      }, () => {
        this.utilService.loadingDismiss();
        this.utilService.toast('Get location failed !');
      });
    });
  }

  attendance(att: EmployeeAttendance) {
    let d = new Date(),
    timeIn = new Date(this.todayWorkshift.timeIn),
    timeOut = new Date(this.todayWorkshift.timeOut);

    this.utilService.loadingPresent('Please wait...')
    .then(() => {
      if (att.id === null) {
        att.tenantId = this.employee.tenantId;
        att.companyId = this.employee.companyId;
        att.employeeId = this.employee.id;          
        att.date = new Date();
        att.dateTimeIn = new Date();
        att.timezoneInfoIn = this.timezoneInfo;
        att.timezoneOffsetIn = this.timezoneOffset;
        att.deviceIdIn = this.deviceTokenId;
        att.workshiftTimeIn = this.todayWorkshift ? new Date(d.getFullYear(), d.getMonth(), d.getDate(), timeIn.getHours(), timeIn.getMinutes()).toISOString() : null;
        att.workshiftTimeOut = this.todayWorkshift ? new Date(d.getFullYear(), d.getMonth(), d.getDate(), timeOut.getHours(), timeOut.getMinutes()).toISOString() : null;
        this.attendanceService.add(att).subscribe(() => {
          this.getAttendanceList(this.employee);
          this.utilService.loadingDismiss();
        }, (error) => {
          console.log(error)
          this.utilService.loadingDismiss();
          this.utilService.toast('Submit clock in failed !');
        });
      } else {
        att.dateTimeOut = new Date();  
        att.timezoneInfoOut = this.timezoneInfo;
        att.timezoneOffsetOut = this.timezoneOffset;
        att.deviceIdOut = this.deviceTokenId;
        this.attendanceService.update(att).subscribe(() => {
          this.getAttendanceList(this.employee);
          this.utilService.loadingDismiss();
        }, () => {
          this.utilService.loadingDismiss();
          this.utilService.toast('Submit clock out failed !');
        });
      }
    });
  }

  isTodayByEmployee(att: AttendanceByEmployee) {
    return this.utilService.isToday(att.employeeAttendance.dateTimeIn);
  }

  isToday(att: EmployeeAttendance) {
    return this.utilService.isToday(att.dateTimeIn);
  }

  getTodayWorkshift(list: any) {
    let d = new Date(), n = d.getDay();
    this.todayWorkshift = list.find((e: { dayName: number; }) => e.dayName === n);
  }

  getSelfiePhoto() {

  }

  short(list: any) {
    return list.sort((a: { dayName: number; }, b: { dayName: number; }) => (a.dayName > b.dayName) ? 1 : -1)
  }

  switchView() {
    this.isRequest = this.isRequest ? false : true;
  }
}
