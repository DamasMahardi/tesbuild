import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Employee, EmployeeInformation, EmployeeInformationUpdate, ImageSourceDto } from '@app/store/models/employee.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UtilService } from '@app/services/util.service';
import { ActionSheetController, AlertController, NavController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ProfileService } from './profile.service';
import { AuthService } from '@app/services/auth.service';
import { Constants } from '@app/store/models';
import { Marital } from '@app/store/enums';
import { environment } from '@environments/environment.prod';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  formProfile: FormGroup;
  employee: EmployeeInformation = new EmployeeInformation();
  employeeUpdate : EmployeeInformationUpdate = new EmployeeInformationUpdate();
  gender = ['Undefined', 'Male', 'Female'];
  religion = ['Undefined', 'Moslem', 'Cristian'];
  maritalStatuspArr = Object.keys(Marital).filter(value => isNaN(Number(value)) === false).map(key => ({ key: key, value: Marital[key] }));
  fullAddress: string = null;

  photo: string = null;

  constructor(
    private storage: Storage,
    private fb: FormBuilder,
    private utilService: UtilService,
    private actionSheetCtrl: ActionSheetController,
    private camera: Camera,
    private profileService: ProfileService,
    private alertCtrl: AlertController,
    private authService: AuthService,
    private navCtrl: NavController
  ) {
    this.buildFormProfile();
  }

  ngOnInit() {
    this.storage.get(`hure_${environment.appName}_employee`)
    .then((employee) => {
      this.employee = new EmployeeInformation(employee);
      this.employeeUpdate = new EmployeeInformationUpdate(employee);
      this.buildFormProfile();
      this.fullAddress = this.employeeUpdate.street+" "+this.employeeUpdate.city+" "+this.employeeUpdate.stateProvince+" "+this.employeeUpdate.zipPostal;
      this.profileService.getProfilePicture(this.employee.id)
      .subscribe((data: ImageSourceDto) => {
        this.photo = data.fileContent;
      });
    });
  }

  buildFormProfile() {
    this.formProfile = this.fb.group({
      firstName: [this.employeeUpdate.firstName, Validators.required],
      middleName: [this.employeeUpdate.middleName],
      lastName: [this.employeeUpdate.lastName],
      photo: [this.employeeUpdate.photo],
      birthDate: [this.employeeUpdate.birthDate, Validators.required],
      birthPlace: [this.employeeUpdate.birthPlace, Validators.required],
      gender: [this.employeeUpdate.gender, Validators.required],
      religion: [this.employeeUpdate.religion, Validators.required],
      street: [this.employeeUpdate.street, Validators.required],
      city: [this.employeeUpdate.city],
      stateProvince: [this.employeeUpdate.stateProvince],
      zipPostal: [this.employeeUpdate.zipPostal],
      nik: [this.employeeUpdate.nik],
      domicileAddress: [this.employeeUpdate.domicileAddress],
      phone: [this.employeeUpdate.phone],
      email: [this.employeeUpdate.email],
      familiCardNumber: [this.employeeUpdate.familyCardNumber],
      savingBookNumber: [this.employeeUpdate.savingBookNumber],
      bankAccount: [this.employeeUpdate.bankAccount],
      maritalStatus: [this.employeeUpdate.marital],
      npwp: [this.employeeUpdate.npwp]
    });
  }

  updateProfile() {
    this.utilService.loadingPresent('Please wait..')
    .then(() => {
      this.postModel(this.employeeUpdate, this.formProfile.getRawValue());
      this.profileService.update(this.employeeUpdate)
        .subscribe(() => {
          this.authService.getCurrentEmployeeInformation(this.utilService.guidEmpty(), null)
          .subscribe((employee: any) => {
            this.employee = employee;
            this.utilService.loadingDismiss()
            this.storage.set(`hure_${environment.appName}_employee`, this.employee);
            this.utilService.toast('Update profile success!', 'top');
          });
        }, (error) => {
          console.log(error)
          this.utilService.loadingDismiss()
          this.utilService.toast('Update profile failed!', 'top');
        })
    });
  }

  async changeAvatar() {
    var languange = window.localStorage.getItem(Constants.KEY_DEFAULT_LANGUAGE);
    const action = await this.actionSheetCtrl.create({
      header: languange && languange === 'id' ? 'Pilih Opsi' : 'Choose options',
      buttons: [
        {
          text: languange && languange === 'id' ? 'Galeri' : 'Gallery',
          icon: 'image',
          handler: () => {
            this.openGallery();
          }
        },
        {
          text: languange && languange === 'id' ? 'Kamera' : 'Camera',
          icon: 'camera',
          handler: () => {
            this.openCamera();
          }
        },
        // {
        //   text: languange && languange === 'id' ? 'Hapus Photo' : 'Remove Avatar',
        //   icon: 'trash',
        //   handler: () => {
        //     this.formProfile.get('photo').setValue(null);
        //     this.updateProfile();
        //   }
        // }
      ]
    });

    action.present();
  }


  openGallery() {
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false,
      allowEdit: true,
      targetWidth: 512,
      targetHeight: 512,
      correctOrientation: true
    }

    this.camera.getPicture(options)
    .then((imageData) => {
      this.photo = 'data:image/png;base64,' + imageData;
      this.profileService.changeProfilePicture({ id: this.employee.id, fileContent: this.photo })
      .subscribe((data: ImageSourceDto) => {
        this.photo = data.fileContent;
      });
    }, () => {
      // Handle error
    });
  }

  openCamera() {
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: false,
      allowEdit: true,
      targetWidth: 512,
      targetHeight: 512,
      correctOrientation: true
    }

    this.camera.getPicture(options)
    .then((imageData) => {
      this.photo = 'data:image/png;base64,' + imageData;
      this.profileService.changeProfilePicture({ id: this.employee.id, fileContent: this.photo })
      .subscribe((data: ImageSourceDto) => {
        this.photo = data.fileContent;
      });
    }, () => {
      // Handle error
    });
  }

  changePassword() {
    let credentials = {
      username: null,
      password: null
    };
    var languange = window.localStorage.getItem(Constants.KEY_DEFAULT_LANGUAGE);
    this.storage.get(`hure_${environment.appName}_credential`)
    .then(async(credential) => {
      credentials = credential;

      let alert = await this.alertCtrl.create({
        header: languange && languange === 'id' ? 'Ubah Kata Sandi' : 'Change Password',
        backdropDismiss: false,
        inputs: [
          {
            name: 'currentPassword',
            placeholder: languange && languange === 'id' ? 'Kata Sandi Saat Ini' : 'Current Password',
            type: 'password'
          },
          {
            name: 'newPassword',
            placeholder: languange && languange === 'id' ? 'Kata Sandi baru' : 'New Password',
            type: 'password'
          },
          {
            name: 'confirmNewPassword',
            placeholder: languange && languange === 'id' ? 'Konfirmasi Kata Sandi' : 'Confirm new password',
            type: 'password'
          }
        ],
        buttons: [
          {
            text: languange && languange === 'id' ? 'Batal' : 'Cancel',
            handler: () => {
              //
            }
          },
          {
            text: languange && languange === 'id' ? 'Simpan' : 'Save',
            handler: (data) => {
              if (data.newPassword !== data.confirmNewPassword) {
                var warning = languange && languange === 'id' ? 'Konfirmasi kata sandi tidak cocok' : "Confirm password don't match"
                this.utilService.toast(warning, 'top');
                return
              }
  
              this.authService.changePassword(data)
                .subscribe(() => {
                  var message = languange && languange === 'id' ? 'Berhasil! Kata sandi Anda telah diubah.' : 'Success! Your password has been changed.'
                  credentials.password = data.newPassword;
                  this.storage.set(`hure_${environment.appName}_credential`, credentials);
                  this.utilService.toast(message, 'top', 3500);
                }, (error) => {
                  console.log(error);
                  let message = error.error.error_description || error.error.error.message;
                  this.utilService.toast(message);
                });
            }
          }
        ]
      });
  
      alert.present();
    });
  }

  /**
   * 
   * @param model 
   * @param form 
   */
  postModel(model: EmployeeInformationUpdate, form: any) {
    model.firstName = form.firstName;
    model.middleName = form.middleName;
    model.lastName = form.lastName;
    model.photo = form.photo;
    model.birthDate = form.birthDate;
    model.birthPlace = form.birthPlace;
    model.gender = form.gender;
    model.religion = form.religion;
    model.street = form.street;
  }

}
