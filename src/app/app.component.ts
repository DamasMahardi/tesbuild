import { Component, Inject } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';
import { APP_CONFIG, AppConfig } from './app.config';
import { AuthService } from '@app/services/auth.service';
import { UtilService } from '@app/services/util.service';
import { Constants } from '@app-store/models/constants.model';
import { environment } from '@environments/environment.prod';
import { NotificationService } from './pages/page/notifications/notificatios.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  constructor(
    @Inject(APP_CONFIG)
    public config: AppConfig,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private translate: TranslateService,
    private router: Router,
    private storage: Storage,
    private navCtrl: NavController,
    private authService: AuthService,
    private utilService: UtilService,
    private notification: NotificationService
  ) {
    this.utilService.getLanguageObservable().subscribe((value) => {
      this.globalize(value);
    })
    this.initializeApp();
    this.getLanguage();
    this.themes();
    this.backButton();
    this.getAuthetication();
    this.getNotification();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.backgroundColorByHexString('#FDB915');
      this.splashScreen.hide();

      let defaultLang = window.localStorage.getItem(Constants.KEY_DEFAULT_LANGUAGE);
      this.globalize(defaultLang);
    });
  }

  getLanguage() {
    this.utilService.getLanguageObservable().subscribe(value => {
      this.globalize(value);
    });
  }

  getAuthetication() {
    Promise.all([
      this.storage.get(`hure_${environment.appName}_tenant`),
      this.storage.get(`hure_${environment.appName}_access_token`)
    ]).then(([tenant, token]) => {
      if (tenant && token) {
        this.authService.getCurrentEmployeeInformation(
          this.utilService.guidEmpty(), tenant.tenantId, token.access_token
        ).subscribe((employee) => {
          this.storage.set(`hure_${environment.appName}_employee`, employee);
          this.storage.set(`hure_${environment.appName}_timezone_info`, this.utilService.timezoneInfo());
          this.storage.set(`hure_${environment.appName}_timezone_offset`, this.utilService.timezoneOffset());
          this.navCtrl.navigateRoot(['./tabs']);
        }, () => {
          // console.log('Failed to login because the token has expired');
          this.utilService.notificationAuthentication.next('Login session ends, login is required again.');
          this.login();
        });
      } else {
        //console.log('Tenants or tokens not found in local storage');
        this.navCtrl.navigateRoot(['./auth/login']);
      }
    });
  }

  login() : void {
    Promise.all([
      this.storage.get(`hure_${environment.appName}_tenant`),
      this.storage.get(`hure_${environment.appName}_credential`)
    ]).then(([tenant, authData]) => {
      if(tenant && authData) {
        this.authService.login(authData, tenant.tenantId)
        .subscribe((token: any) => {
          this.storage.set(`hure_${environment.appName}_access_token`, token).then(() => {
            if (tenant && token) {
              this.authService.getCurrentEmployeeInformation(
                this.utilService.guidEmpty(), tenant.tenantId, token.access_token
              ).subscribe((employee) => {
                this.storage.set(`hure_${environment.appName}_employee`, employee);
                this.storage.set(`hure_${environment.appName}_timezone_info`, this.utilService.timezoneInfo());
                this.storage.set(`hure_${environment.appName}_timezone_offset`, this.utilService.timezoneOffset());
                this.storage.set(`hure_${environment.appName}_credential`, authData);
                this.authService.getApplicationConfiguration(tenant.tenantId, token.access_token)
                  .subscribe((configuration) => {
                    this.storage.set(`hure_${environment.appName}_settings`, configuration['setting']['values']);
                  });
                this.navCtrl.navigateRoot(['./tabs']);
              }, () => {
                this.storage.remove(`hure_${environment.appName}_access_token`);
                this.navCtrl.navigateRoot(['./auth/login']);
              });
            }
          });
        }, () => {
          this.utilService.notificationAuthentication.next('Authentication failed');
          this.storage.remove(`hure_${environment.appName}_access_token`);
          this.storage.remove(`hure_${environment.appName}_credential`);
          this.navCtrl.navigateRoot(['./auth/login']);
        });
      } else {
        this.storage.remove(`hure_${environment.appName}_access_token`);
        this.storage.remove(`hure_${environment.appName}_credential`);
        this.navCtrl.navigateRoot(['./auth/login']);
      }
    });
  }

  globalize(languagePriority: string) {
    moment.locale('id');
    this.translate.setDefaultLang("en");
    let defaultLangCode = this.config.availableLanguages[0].code;
    this.translate.use(languagePriority && languagePriority.length ? languagePriority : defaultLangCode);
  }

  themes() {
    if (window.matchMedia('(prefers-color-scheme)').media !== 'not all') {
      console.log('🎉 Dark mode is supported');
    }

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    toggleDarkTheme(prefersDark.matches);

    prefersDark.addListener((mediaQuery) => toggleDarkTheme(mediaQuery.matches));

    function toggleDarkTheme(shouldAdd: boolean) {
      document.body.classList.toggle('dark', shouldAdd);
    }
  }

  backButton() {
    this.platform.backButton.subscribe(() => {
      if (this.router.url === '/'
        || this.router.url === '/page/landing'
        || this.router.url === '/tabs'
        || this.router.url === '/tabs/blogs'
        || this.router.url === '/tabs/chats'
        || this.router.url === '/tabs/home'
        || this.router.url === '/tabs/notification'
        || this.router.url === '/tabs/account'
        || this.router.url === '/auth/login') {
        navigator['app'].exitApp();
      } else {
        return
      }
    });
  }

  getNotification() {
    if (this.platform.is('cordova')) {
      this.notification.getNotification();
    }
  }
}
