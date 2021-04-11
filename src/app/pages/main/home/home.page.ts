import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AuthService } from '@app/services/auth.service';
import { UtilService } from '@app/services/util.service';
import { EmployeeAttendance, AttendanceByEmployee, EmployeeInformation, Employee, ImageSourceDto } from '@app-models';
import { AttendanceService } from '@app-pages/main/human-resource/employee-attendance/attendance.service';
import { ProfileService } from '@app-pages/auth/profile/profile.service';
import { NavigationExtras } from '@angular/router';
import { ReleaseService } from '@app/pages/page/release/release.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { Tab } from '@app/navigation/tabs/tabs.page';
import * as moment from 'moment';
import { 
  toLatLon, toLatitudeLongitude, headingDistanceTo, moveTo, insidePolygon 
} from 'geolocation-utils';
import { environment } from '@environments/environment.prod';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, Tab {

  clickedImage: string;

  options: CameraOptions = {
    quality: 30,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  release: any[] = [];
  employee: EmployeeInformation = new EmployeeInformation();
  attendanceList: any[] = [];
  workshift: any = {};
  todayWorkshift: any = null;
  todayAttendance: EmployeeAttendance = new EmployeeAttendance();
  employeeAttendance: AttendanceByEmployee = new AttendanceByEmployee();
  today: Date = new Date();
  timezoneInfo: string = null;
  timezoneOffset: number = 0;
  deviceTokenId: string = null;
  isRequest: boolean = true;
  attendanceRecognitionList: any[] = [];
  isScheduleOff: boolean = false;
  isClockIn: boolean = false;
  isClockOut: boolean = false;

  isSehat: boolean = false;
  isLocationRange: boolean = false;
  isSelfie: boolean = false;

  photo: string = null;
  

  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    private utilService: UtilService,
    private storage: Storage,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private platform: Platform,
    private realeaseService: ReleaseService,
    private attendanceService: AttendanceService,
    private profileService: ProfileService,
    private camera: Camera,
  ) {
    this.release = this.realeaseService.releaseList();
  }

  captureImage() {
    this.camera.getPicture(this.options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.clickedImage = base64Image;
    }, (err) => {
      console.log(err);
      // Handle error
    });
  }
  

  ngOnInit() {
    //
  }

  pageWillReload() { // Eg: Homepage => AttendancePage => HomePage
    this.ionViewWillEnter();
  }

  ionViewWillEnter() {
    Promise.all([
      this.storage.get(`hure_${environment.appName}_employee`),
      this.storage.get(`hure_${environment.appName}_timezone_info`),
      this.storage.get(`hure_${environment.appName}_timezone_offset`),
      this.storage.get(`hure_${environment.appName}_deviceTokenId`),
      this.storage.get(`hure_${environment.appName}_tenant`),
      this.storage.get(`hure_${environment.appName}_access_token`),
      this.storage.get(`hure_${environment.appName}_settings`)
    ]).then(([employee, timezone_info, timezone_offset, deviceTokenId, tenant, token, settings]) => { 
      if (employee) {
        this.employee = new EmployeeInformation(employee);
        this.getAttendance(employee);
        this.getProfilePicture();
      } else {
        this.authService.getCurrentEmployeeInformation(this.utilService.guidEmpty(), tenant.tenantId, token.access_token)
          .subscribe((employee: any) => {
            this.employee = new EmployeeInformation(employee);
            this.getAttendance(employee);
            this.getProfilePicture();
          });
      }
      this.timezoneInfo = timezone_info;
      this.timezoneOffset = timezone_offset;
      this.deviceTokenId = deviceTokenId;
      this.isSelfie = this.utilService.getSetting('CORE.Attendance.Selfie', settings);
      this.isLocationRange = this.utilService.getSetting('CORE.Attendance.Location', settings);
      this.isSehat = this.utilService.getSetting('CORE.Integration.App.Sehat', settings);
    });
  }

  getAttendance(employee: EmployeeInformation) {
    this.utilService.loadingPresent('Please wait...')
    .then(() => {
      this.attendanceService.getAttendanceByEmployee(employee.id)
      .subscribe((todayAttendances) => {
        this.utilService.loadingDismiss();
        this.employeeAttendance = new AttendanceByEmployee(todayAttendances);
        this.isScheduleOff = this.employeeAttendance.employeeWorkshift.workshiftId ? false : true;
        this.todayAttendance = this.isToday(this.employeeAttendance) 
          ? new EmployeeAttendance(this.employeeAttendance.employeeAttendance) 
          : new EmployeeAttendance();

        this.checkScheduleAttendance();

      }, () => {
        this.utilService.loadingDismiss();
      });
    })
  }

  checkLatestAttendance() : boolean {
    let dateMin = moment().subtract(1, 'days'),
        dateMax = moment(),
        day = moment(this.employeeAttendance.employeeAttendance.date);
    return day > dateMin && day < dateMax;
  }

  checkScheduleAttendance() {
    let checkLatestAttendance = this.checkLatestAttendance();
    let today = new Date();
    
    if(this.employeeAttendance.employeeAttendance.id === null)
    {
      // CLOCK IN
      // Kondisi ini jika karyawan belum pernah melakukan absen / untuk karyawan baru
      this.isClockIn = true;
      this.isClockOut = false;
    } 
    else if(checkLatestAttendance === false && this.employeeAttendance.employeeAttendance.id !== null
    ) {
      // CLOCK IN
      // console.log('CLOCK IN');
      this.isClockIn = true;
      this.isClockOut = false;
    } 
    else if(checkLatestAttendance === true
      && this.employeeAttendance.employeeAttendance.id !== null
      && this.employeeAttendance.employeeAttendance.dateTimeOut !== null
      && today.getHours() <= (new Date(this.employeeAttendance.workShiftDetail.timeIn).getHours() - 3)
    ) {
      // Belum waktunya clock in
      // console.log('Belum waktunya clock in');
      this.isClockIn = false;
      this.isClockOut = false;
    }
    else if(this.employeeAttendance.employeeAttendance.dateTimeOut !== null 
      && this.todayAttendance.id === null) 
    {
      // CLOCK IN
      // Kondisi jika karyawan sudah melakukan absen masuk (kemarin)
      // console.log('CLOCK IN');
      this.isClockIn = true;
      this.isClockOut = false;
    }
    else if(today.getHours() >= (new Date(this.employeeAttendance.workShiftDetail.timeIn).getHours() - 3) 
      && this.todayAttendance.id === null)
    {
      // CLOCK IN
      // console.log('CLOCK IN');
      this.isClockIn = true;
      this.isClockOut = false;
    }
    else if(this.employeeAttendance.employeeAttendance.dateTimeIn !== null
      && this.employeeAttendance.employeeAttendance.dateTimeOut === null)
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

          if (this.isLocationRange) {
            this.distanceValidation(this.employee, att, location.latitude, location.longitude);
          } else {
            this.attendance(att);
          }

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
            
            if (this.isLocationRange) {
              this.distanceValidation(this.employee, att, location.geometry.location.lat, location.geometry.location.lng);
            } else {
              this.attendance(att);
            }
            
          }, () => {
            this.utilService.loadingDismiss();
            this.utilService.toast('Get location failed !');
          });
      }, () => {
        this.utilService.loadingDismiss();
        this.utilService.toast('Get location failed !');
      });
    })
  }

  distanceValidation(employee: EmployeeInformation, att: EmployeeAttendance, lat: string, lng: string) {
    if (employee.locationId) {
      this.attendanceService.getLocation(employee.locationId)
        .subscribe((location: any) => {
          const location1 = {lat: Number(location.lat), lon: Number(location.lng)} // Office Location
          const location2 = {lat: Number(lat), lon:  Number(lng) } // User Location
          const distance = headingDistanceTo(location1, location2);
          if (distance.distance < 50) { // in meters, TODO : radius configuration, job title validation
            this.attendance(att);
          } else {
            this.utilService.toast('Out of location range !');
          }
        });
    }    
  }

  attendance(att: EmployeeAttendance) {
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
        
        this.attendanceService.add(att).subscribe(() => {
          this.getAttendance(this.employee);
          this.utilService.loadingDismiss();
        }, () => {
          this.utilService.loadingDismiss();
          this.utilService.toast('Submit clock in failed !');
        });
      } else {
        att.dateTimeOut = new Date();
        att.timezoneInfoOut = this.timezoneInfo;
        att.timezoneOffsetOut = this.timezoneOffset;
        att.deviceIdOut = this.deviceTokenId;
        
        this.attendanceService.update(att).subscribe(() => {
          this.getAttendance(this.employee);
          this.utilService.loadingDismiss();
        }, () => {
          this.utilService.loadingDismiss();
          this.utilService.toast('Submit clock out failed !');
        });
      }
    });
  }

  isToday(att: AttendanceByEmployee) {
    return this.utilService.isToday(att.employeeAttendance.dateTimeIn);
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

  goToPage(page?: string) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        title: page
      }
    }

    if (page) {
      switch (page) {
        case 'release':
          this.navCtrl.navigateForward([`./page/${page}`]);
          break;
        case 'overtime':
          this.navCtrl.navigateForward([`./main/human-resources/${page}`]);
          break;
        case 'leave':
          this.navCtrl.navigateForward([`./main/human-resources/${page}`]);
          break;
        case 'attendance':
          this.navCtrl.navigateForward([`./main/human-resources/${page}`]);
          break;
        case 'attendance-request':
          this.navCtrl.navigateForward([`./main/human-resources/${page}`]);
          break;
        case 'attendance-recognition':
          this.navCtrl.navigateForward([`./main/human-resources/${page}`]);
          break;
        case 'payroll':
          // this.navCtrl.navigateForward([`./main/human-resources/${page}`]);
          this.navCtrl.navigateForward([`./page/about`], navigationExtras);
          break;
        case 'training':
          this.navCtrl.navigateForward([`./page/about`], navigationExtras);
          //this.navCtrl.navigateForward([`./main/human-resources/${page}`]);
          break;
        case 'benefit':
          this.navCtrl.navigateForward([`./page/about`], navigationExtras);
          //this.navCtrl.navigateForward([`./main/human-resources/${page}`]);
          break;
        case 'performance':
          this.navCtrl.navigateForward([`./page/about`], navigationExtras);
          //this.navCtrl.navigateForward([`./main/human-resources/${page}`]);
          break;
        case 'announcement':
          this.navCtrl.navigateForward([`./page/about`], navigationExtras);
          //this.navCtrl.navigateForward([`./main/human-resources/${page}`]);
          break;
        case 'files':
          this.navCtrl.navigateForward([`./page/about`], navigationExtras);
          //this.navCtrl.navigateForward([`./main/human-resources/${page}`]);
          break;
        case 'course':
          this.navCtrl.navigateForward([`./main/learning-management-system/${page}`]);
          break;
        case 'sales-activity':
          navigationExtras.queryParams['title'] = 'Sales Activity';
          this.navCtrl.navigateForward([`./main/activity/${page}`], navigationExtras);
          break;
        default:
          break;
      }
    }
  }

  getProfilePicture() {
    this.profileService.getProfilePicture(this.employee.id)
    .subscribe((data: ImageSourceDto) => {
      this.photo = data.fileContent;
    });
  }

}
