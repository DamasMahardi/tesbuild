import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { NavController, Platform, PopoverController} from '@ionic/angular';
import { forkJoin } from 'rxjs';
import { AuthService } from '@app/services/auth.service';
import { UtilService } from '@app/services/util.service';
import { OvertimeService } from './overtime.service';
import { OvertimeStatus } from '@app/store/enums/overtime-status';
import { 
  EmployeeInformation, 
  EmployeeOvertimeWithNavigationProperties, 
  EmployeeOvertime 
} from '@app-models';
import { ApprovalStatus } from '@app/store/enums/approval-status';
import { AttendanceService } from '../employee-attendance/attendance.service';
import { environment } from '@environments/environment.prod';

@Component({
  selector: 'app-overtime',
  templateUrl: './overtime.page.html',
  styleUrls: ['./overtime.page.scss'],
})
export class OvertimePage implements OnInit {

  employee: EmployeeInformation = new EmployeeInformation();
  approvalStatusArr = Object.keys(ApprovalStatus).filter(value => isNaN(Number(value)) === false).map(key => ({ key: key, value: ApprovalStatus[key] }));
  overtimeStatussArr = Object.keys(OvertimeStatus).filter(value => isNaN(Number(value)) === false).map(key => ({ key: key, value: OvertimeStatus[key] }));
  requestList: EmployeeOvertimeWithNavigationProperties[] = [];
  approveList: EmployeeOvertimeWithNavigationProperties[] = [];
  isRequest: boolean = true;
  workShift : any = {};
  overtimeStatus = ["Ask appoval", "Approved", "Rejected"];

  constructor(
    private navCtrl: NavController,
    private overtimeService: OvertimeService,
    private authService: AuthService,
    private utilService: UtilService,
    private storage: Storage,
    private attendanceService: AttendanceService,
    public popoverController: PopoverController,
    private platform: Platform,
    private router: Router
  ) {
    this.platform.backButton.subscribe(async() => {
      if(this.router.url === '/main/human-resources/overtime') {
        if(await this.popoverController.getTop()) {
          return this.popoverController.dismiss();
        }
      }      
    })
  }

  ngOnInit() {

  }

  ionViewWillEnter() {
      this.storage.get(`hure_${environment.appName}_employee`)
        .then((employee) => {
          if (employee) {
            this.employee = new EmployeeInformation(employee);
            this.employee.isOvertime = true;
            this.getOvertimeList(this.employee);
          } else {
            this.authService.getCurrentEmployeeInformation(this.utilService.guidEmpty(), null)
              .subscribe((employee: any) => {
                this.employee = new EmployeeInformation(employee);
                this.getOvertimeList(this.employee);
              });
          }
      });
  }

  getOvertimeList(employee: EmployeeInformation) {
    this.utilService.loadingPresent('Please wait...')
    .then(() => {
      forkJoin([
        this.overtimeService.getByEmployeeId(employee.id, 10),
        this.overtimeService.getByApproved1Id(employee.id, 10)
      ]).subscribe(([requestList, approveList]) => {
        this.requestList = requestList.items;
        this.approveList = approveList.items;
        this.utilService.loadingDismiss();
      }, () => {
        this.utilService.loadingDismiss();
      });
    });
  }

  newRequest() {
    if(this.employee.isOvertime === true) {
      this.overtimeService.getByIdWithNavigationProperties(this.utilService.guidEmpty())
      .subscribe((data: EmployeeOvertimeWithNavigationProperties) => {
        let navigationExtras: NavigationExtras = {
          queryParams: {
            pageType: 'new',
            title: 'New Request',
            data: data,
          }
        }
        this.navCtrl.navigateForward('/main/human-resources/overtime/overtime-detail', navigationExtras);
      });
    }
  }

  approvedStatus(e: EmployeeOvertime) {
    let m = new EmployeeOvertime(e);
    let status = false;
    if (m.approved1Status == ApprovalStatus.AskApproval
      && m.approved1ById === this.employee.id) {
        status = true;
      }
    if (m.approved2Status == ApprovalStatus.AskApproval
      && m.approved2ById === this.employee.id) {
        status = true;
      }
    if (m.approved3Status == ApprovalStatus.AskApproval
      && m.approved3ById === this.employee.id) {
        status = true;
      }
    return status;
  }

  cancelStatus(e: EmployeeOvertime) {
    let m = new EmployeeOvertime(e);
    let status = false;
    if (m.overtimeHrdStatus == OvertimeStatus.AskApproval
      && m.employeeId === this.employee.id) {
        status = true;
      }
    return status;
  }

  approve(e: EmployeeOvertimeWithNavigationProperties, status: boolean, type: string = null) {
    let m = new EmployeeOvertime(e.employeeOvertime);
    const approvedStatus = status ? ApprovalStatus.Approved : ApprovalStatus.Rejected;  

    if (type) {
      // Cancel
    } else { 
      if ( m.approved1Status === ApprovalStatus.AskApproval
        && m.approved1ById === this.employee.id
      ) {
        m.approved1DateTime = new Date();
        m.approved1Status = approvedStatus;
      }
  
      if ( m.approved2Status === ApprovalStatus.AskApproval
        && m.approved2ById === this.employee.id
      ) {
        m.approved2DateTime = new Date();
        m.approved2Status = approvedStatus;
      }
  
      if (m.approved3Status === ApprovalStatus.AskApproval
        && m.approved3ById === this.employee.id
      ) {
        m.approved3DateTime = new Date();
        m.approved3Status = approvedStatus;
      }
  
      this.utilService.loadingPresent('Please wait...')
      .then(() => {
        this.overtimeService.update(m).subscribe(() => {
          this.utilService.loadingDismiss();
            this.getOvertimeList(this.employee);
          }, () => {
            this.utilService.loadingDismiss();
            this.utilService.alert("Request approved/ reject failed!");
          });
      });
    }
  }

  switchView() {
    this.isRequest = this.isRequest ? false : true;
  }
}

