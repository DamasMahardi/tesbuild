import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { NavController, PopoverController, Platform } from '@ionic/angular';
import { forkJoin } from 'rxjs';
import { AuthService } from '@app/services/auth.service';
import { UtilService } from '@app/services/util.service';
import { LeaveService } from './leave.service';
import { LeaveStatus } from '@app/store/enums/leave-status';
import {
  EmployeeInformation,
  EmployeeLeaveWithNavigationProperties,
  EmployeeLeave
} from '@app-models';
import { ApprovalStatus } from '@app/store/enums/approval-status';
import { environment } from '@environments/environment.prod';
//import { PopOverPage } from '@app/pages/page/pop-over/pop-over.page';

@Component({
  selector: 'app-leave',
  templateUrl: './leave.page.html',
  styleUrls: ['./leave.page.scss'],
})
export class LeavePage implements OnInit {

  employee: EmployeeInformation = new EmployeeInformation();
  approvalStatusArr = Object.keys(ApprovalStatus).filter(value => isNaN(Number(value)) === false).map(key => ({ key: key, value: ApprovalStatus[key] }));
  leaveStatussArr = Object.keys(LeaveStatus).filter(value => isNaN(Number(value)) === false).map(key => ({ key: key, value: LeaveStatus[key] }));
  requestList: EmployeeLeaveWithNavigationProperties[] = [];
  approveList: EmployeeLeaveWithNavigationProperties[] = [];
  isRequest: boolean = true;
  leaveTypeList = [
    "None",
    "Annual",
    "Sabbatical",
    "Sick",
    "Menstrual",
    "Maternity",
    "Paternity",
    "Umrah",
    "Hajj",
    "Marriage",
    "Child Marriage",
    "Child Khitan",
    "Family Died",
    "Call By Authorities",
    "Come Too Late",
    "Home Early",
    "Out Of Office",
    "Overseas",
    "Permission",
    "Unpaid"
  ];

  approvalStatus = ["Ask appoval", "Approved", "Rejected"];

  constructor(
    private navCtrl: NavController,
    private leaveService: LeaveService,
    private authService: AuthService,
    private utilService: UtilService,
    private storage: Storage,
    public popoverController: PopoverController,
    private platform: Platform,
    private router: Router
  ) {
    this.platform.backButton.subscribe(async() => {
      if(this.router.url === '/main/human-resources/leave') {
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
          this.getLeaveList(this.employee);
        } else {
          this.authService.getCurrentWithNavigationProperties(this.utilService.guidEmpty())
            .subscribe((employee: any) => {
              this.employee = new EmployeeInformation(employee);
              this.getLeaveList(this.employee);
            });
        }
      });
  }

  getLeaveList(employee: EmployeeInformation) {
    this.utilService.loadingPresent('Please wait...')
      .then(() => {
        forkJoin([
          this.leaveService.getByEmployeeId(employee.id, 10),
          this.leaveService.getByApprovedId(employee.id, 10)
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
    this.leaveService.getByIdWithNavigationProperties(this.utilService.guidEmpty())
      .subscribe((data: EmployeeLeaveWithNavigationProperties) => {
        let navigationExtras: NavigationExtras = {
          queryParams: {
            pageType: 'new',
            title: 'New Request',
            data: data
          }
        }
        this.navCtrl.navigateForward('/main/human-resources/leave/leave-detail', navigationExtras);
      });
  }

  approvedStatus(e: EmployeeLeave) {
    let m = new EmployeeLeave(e);
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

  cancelStatus(e: EmployeeLeave) {
    let m = new EmployeeLeave(e);
    let status = false;
    if (m.leaveHrdStatus == LeaveStatus.AskApproval
      && m.employeeId === this.employee.id) {
        status = true;
      }
    return status;
  }

  approve(e: EmployeeLeaveWithNavigationProperties, status: boolean, type: string = null) {
    let m = new EmployeeLeave(e.employeeLeave);
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
        this.leaveService.update(m).subscribe(() => {
          this.utilService.loadingDismiss();
          this.getLeaveList(this.employee);
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
