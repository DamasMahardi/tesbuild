import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInput, NavController, Platform } from '@ionic/angular';
import { AuthService } from '@app/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { UtilService } from '@app/services/util.service';
import { NotificationService } from '@app-pages/page/notifications/notificatios.service';
import { ReleaseService } from '@app/pages/page/release/release.service';
import { ProfileService } from '../profile/profile.service';
import { EmployeeInformation } from '@app-models';
import { environment } from '@environments/environment.prod';

@Component({
  selector: 'page-login',
  templateUrl: 'login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild('userName', {static: false})  userNameInput: IonInput;
  @ViewChild('password', {static: false})  passwordInput: IonInput;
  @ViewChild('tenant', {static: false})  tenantInput: IonInput;

  formTenant: FormGroup;
  formLogin: FormGroup;
  showLoading: boolean = false;
  tenantName: string = null;
  tenantMessage: string = null;
  loginMessage: string = null;
  loginFailed: number = 0;
  release: any[] = [];

  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    private fb: FormBuilder,
    private storage: Storage,
    private utilService: UtilService,
    private platform: Platform,
    private realeaseService: ReleaseService,
    private notificationService: NotificationService,
    private profileService: ProfileService

  ) {
    this.buildFormTenant();
    this.release = this.realeaseService.releaseList();
  }

  ngOnInit() {
    this.storage.get(`hure_${environment.appName}_tenant`)
    .then((tenant) => {
      if (tenant) {
        this.tenantName = tenant.name;
        this.buildFormLogin();
      } else {
        this.buildFormTenant();
      }
    });
  }

  buildFormTenant() {
    this.formTenant = this.fb.group({
      tenantName: [null, Validators.required]
    });
  }

  buildFormLogin() {
    this.formLogin = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  getTenant() {
    if (this.formTenant.invalid) {
      return;
    }

    const authData = this.formTenant.getRawValue();
    this.tenantMessage = null;
    this.utilService.loadingPresent('Please wait...')
    .then(() => {
      this.authService.getTenantByName(authData.tenantName)
      .subscribe((tenant: any) => {
        this.utilService.loadingDismiss();
        if (tenant.success) {
          this.storage.set(`hure_${environment.appName}_tenant`, tenant).then(() => {
            this.tenantName = tenant.name;
            this.buildFormLogin();
          });
        } else {
          this.tenantMessage = 'No Available Tenant';
          this.formTenant.reset();
        }
      }, () => {
        this.utilService.loadingDismiss();
        this.tenantMessage = 'Get Tenant Error';
        this.formTenant.reset();
      });
    });
  }

  setTenant() {
    this.tenantName = null;
    this.loginFailed = null;
    this.loginMessage = null;
    this.storage.remove(`hure_${environment.appName}_tenant`).then(() => {
      this.buildFormTenant();
    });
  }

  login() {
    if (this.formLogin.invalid) {
      return;
    }

    const authData = this.formLogin.getRawValue();
    this.tenantMessage = null;
    this.utilService.loadingPresent('Please wait...')
    .then(() => {
      this.storage.get(`hure_${environment.appName}_tenant`).then((tenant) => {

        this.authService.login(authData, tenant.tenantId)
          .subscribe((token: any) => {
  
            this.storage.set(`hure_${environment.appName}_access_token`, token).then(() => {
  
              if (tenant && token) {
  
                this.authService.getCurrentEmployeeInformation(this.utilService.guidEmpty(), tenant.tenantId, token.access_token)
                .subscribe((employee) => {
                  this.storage.set(`hure_${environment.appName}_employee`, employee);
                  this.storage.set(`hure_${environment.appName}_timezone_info`, this.utilService.timezoneInfo());
                  this.storage.set(`hure_${environment.appName}_timezone_offset`, this.utilService.timezoneOffset());
                  this.storage.set(`hure_${environment.appName}_credential`, authData);
                  this.authService.getApplicationConfiguration(tenant.tenantId, token.access_token)
                    .subscribe((configuration) => {
                      this.storage.set(`hure_${environment.appName}_settings`, configuration['setting']['values']);
                    });
                  this.notificationConfiguration(employee, tenant.tenantId);
                  this.utilService.loadingDismiss();
                  this.navCtrl.navigateRoot(['./tabs']);
                }, (error) => {
                  this.utilService.loadingDismiss();
                  this.navCtrl.navigateRoot(['./auth/login']);
                  this.tenantMessage = error;
                });
              } else {
                this.utilService.loadingDismiss();
                this.navCtrl.navigateRoot(['./auth/login']);
                this.tenantMessage = 'No Tenant or Token!';
              }
            });
  
          }, () => {
            this.utilService.loadingDismiss();
            this.formLogin.reset();
            this.loginFailed++;
            this.loginMessage = `Authentication failed (${this.loginFailed})`;
            if (this.loginFailed == 3) {
              this.setTenant();
            }
          });
      });
    });
  }

  message(error: any) {
    return error.error.error_description || error.error.error.message;
  }

  notificationConfiguration(employee: any, tenantId: string) {
    let _employee = new EmployeeInformation(employee);
    if (this.platform.is('cordova')) {
      this.notificationService.getToken().then((deviceTokenId) => {
        _employee.deviceId = deviceTokenId;
        employee = _employee;

        Promise.all([
          this.notificationService.addTokenToTopic(deviceTokenId, `attendance-${tenantId}`),
          this.notificationService.addTokenToTopic(deviceTokenId, `announcement-${tenantId}`),
          this.notificationService.addTokenToTopic(deviceTokenId, `news-${tenantId}`)
        ]).then(() => {
          this.profileService.update(_employee)
            .subscribe(() => {
              this.storage.set(`hure_${environment.appName}_employee`, employee)
              this.storage.set(`hure_${environment.appName}_deviceTokenId`, deviceTokenId);
            });
        }).catch((error) => {
          console.log(error)
        })
      });
    }
  }

  goToPage(page?: string) {
    this.navCtrl.navigateForward([`./page/${page}`]);
  }

  forgotPassword() {
    this.navCtrl.navigateForward('/auth/forgot-password');
  }

  moveField(code: any) {
    switch(code.type) {
      case "tenant": 
        setTimeout(() => {
          this.tenantInput.setFocus();
        }, 300);
      break;

      case "userName": 
        setTimeout(() => {
          this.userNameInput.setFocus();
        }, 300);
      break;

      case "password": 
        setTimeout(() => {
          this.passwordInput.setFocus();
        }, 300);
      break;

      default:
        break;
    }
  }
}
