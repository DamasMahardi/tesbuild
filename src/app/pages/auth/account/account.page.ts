import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AuthService } from '@app/services/auth.service';
import { UtilService } from '@app/services/util.service';
import { NotificationService } from '@app-pages/page/notifications/notificatios.service';
import { ProfileService } from '@app-pages/auth/profile/profile.service';
import { EmployeeInformation, ImageSourceDto } from '@app-store/models/employee.model';
import { Tab } from '@app/navigation/tabs/tabs.page';
import { Constants } from '@app/store/models';
import { environment } from '@environments/environment.prod';

@Component({
  selector: 'page-account',
  templateUrl: 'account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit, Tab {

  employee: EmployeeInformation = new EmployeeInformation();
  viewType: string;
  language: string =  null;

  photo: string = null;

  constructor(
    private navCtrl: NavController,
    private storage: Storage,
    private authService: AuthService,
    private notificationService: NotificationService,
    private utilService: UtilService,
    private profileService: ProfileService,
  ) {

  }

  ngOnInit() {

  }

  ionViewWillEnter() {
    var getLanguange = window.localStorage.getItem(Constants.KEY_DEFAULT_LANGUAGE);
    if(getLanguange && getLanguange === 'id') {
      this.language = 'id'
    } else {
      this.language = 'en'
    }

    Promise.all([
      this.storage.get(`hure_${environment.appName}_employee`),
      this.storage.get(`hure_${environment.appName}_tenant`),
      this.storage.get(`hure_${environment.appName}_access_token`)
    ]).then(([employee, tenant, token]) => {
      if(employee) {
        this.employee = new EmployeeInformation(employee);
        this.getProfilePicture();
      } else {
        this.authService.getCurrentEmployeeInformation(
          this.utilService.guidEmpty(), 
          tenant.tenantId, 
          token.access_token)
          .subscribe((employee: any) => {
            this.employee = new EmployeeInformation(employee);
            this.getProfilePicture();
          });
      }
    });
  }

  pageWillReload() { // Eg: Homepage => AttendancePage => HomePage
    this.ionViewWillEnter();
  }

  mailTo(email: string) {
    window.open(`mailto:${email}`);
  }

  call(telp: string) {
    window.open(`tel:${telp}`);
  }

  openUrl(url: string) {
    window.open(url, '_system', 'location=yes');
    return false;
  }

  goProfile() {
    this.navCtrl.navigateForward('/auth/profile')
  }

  newRequest() {
    this.navCtrl.navigateForward('/auth/request')
  }

  setViewType(vt) {
    this.viewType = vt;
  }

  languageConfirm(code: string) {
    this.viewType = null;
    this.language = code;
    this.utilService.setLanguageData(code);
    window.localStorage.setItem(Constants.KEY_DEFAULT_LANGUAGE, code);
  }

  logout() {
    this.utilService.loadingPresent('Please wait...');
    this.authService.logout()
      .subscribe(() => {
        Promise.all([
          // this.notificationService.removeTokenFromTopic(this.employee.deviceId, `attendance-${this.employee.tenantId}`),
          // this.notificationService.removeTokenFromTopic(this.employee.deviceId, `announcement-${this.employee.tenantId}`),
          // this.notificationService.removeTokenFromTopic(this.employee.deviceId, `news-${this.employee.tenantId}`),
          // this.notificationService.removeTokenFromTopic(this.employee.deviceId, `birthday-${this.employee.tenantId}`),
          // this.notificationService.removeTokenFromTopic(this.employee.deviceId, `birthday-${this.employee.id}`),
          this.storage.remove(`hure_${environment.appName}_tenant`),
          this.storage.remove(`hure_${environment.appName}_access_token`),
          this.storage.remove(`hure_${environment.appName}_configurations`),
          this.storage.remove(`hure_${environment.appName}_employee`),
          this.storage.remove(`hure_${environment.appName}_deviceTokenId`)
        ]).then(() => {
          this.utilService.loadingDismiss();
          this.navCtrl.navigateRoot(['./auth/login'])
        });
      })
  }

  getProfilePicture() {
    this.profileService.getProfilePicture(this.employee.id)
    .subscribe((data: ImageSourceDto) => {
      this.photo = data.fileContent;
    });
  }
}
