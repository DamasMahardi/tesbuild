import { Component, OnInit } from '@angular/core';
import { AttendanceRecognitionService } from './attendance-recognition.service';
import { EmployeeInformation, EmployeeAttendanceRecognitionWithNavigationProperties } from '@app/store/models';
import { Storage } from '@ionic/storage';
import { UtilService } from '@app/services/util.service';
import { environment } from '@environments/environment.prod';

@Component({
  selector: 'app-attendance-recognition',
  templateUrl: './attendance-recognition.page.html',
  styleUrls: ['./attendance-recognition.page.scss'],
})
export class AttendanceRecognitionPage implements OnInit {

  attendanceRecognitionList: EmployeeAttendanceRecognitionWithNavigationProperties[] = []

  constructor(
    private attendanceRecognitionService: AttendanceRecognitionService,
    private storage: Storage,
    private utilService: UtilService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.utilService.loadingPresent('Please wait...')
      .then(() => {
        this.storage.get(`hure_${environment.appName}_employee`)
          .then((employee: EmployeeInformation) => {
            this.attendanceRecognitionService.getAttendanceRecogion(employee.id, " ", " ", 10)
              .subscribe((attendanceRecognitionList) => {
                this.utilService.loadingDismiss();
                this.attendanceRecognitionList = attendanceRecognitionList.items;
              }, () => {
                this.utilService.loadingDismiss();
              });
          });
      });
  }

}
