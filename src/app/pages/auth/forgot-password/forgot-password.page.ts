import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@app/services/auth.service';
import { UtilService } from '@app/services/util.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  form: FormGroup
  constructor(
    private fb: FormBuilder,
    private utilService: UtilService,
    private authService: AuthService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])]
    })
  }

  submit() {
    let body = {
      email: this.form.value.email,
      appName: "MVC",
      returnUrl: "",
      returnUrlHash: ""
    }
    this.utilService.loadingPresent('Please wait...')
    .then(() => {
      this.authService.resetPassword(body).subscribe(() => {
        this.utilService.loadingDismiss()
        .then(() => {
          this.utilService.toast('Success!. Account recovery email sent to your email address.')
          .then(() => {
            this.navCtrl.pop();
          })
        });
      }, () => {
        this.utilService.loadingDismiss();
        this.utilService.toast('Request failed !');
      })
    })
  }
}
