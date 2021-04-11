import { Component, OnInit } from '@angular/core';
import { EmployeeInformation, EmployeeWithNavigationProperties } from '@app/store/models/employee.model';
import { EmployeeLeaveWithNavigationProperties, EmployeeLeave } from '@app/store/models/employee-leave.model';
import { EmployeeOvertimeWithNavigationProperties, EmployeeOvertime } from '@app/store/models/employee-overtime.model';
import { NotificationService } from '@app-pages/page/notifications/notificatios.service';
import { ActivatedRoute } from '@angular/router';
import { OvertimeService } from '@app/pages/main/human-resource/employee-overtimes/overtime.service';
import { LeaveService } from '@app/pages/main/human-resource/employee-leaves/leave.service';
import { ApprovalStatus } from '@app/store/enums/approval-status';
import { UtilService } from '@app/services/util.service';
import { Notification } from '@app/store/models/employee-notification.model';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-notification-detail',
  templateUrl: './notification-detail.page.html',
  styleUrls: ['./notification-detail.page.scss'],
})
export class NotificationDetailPage implements OnInit {

  pageType: string = null;
  title: string = null;
  employee: EmployeeInformation;
  employeeProfile: EmployeeWithNavigationProperties;
  employeeLeave: EmployeeLeaveWithNavigationProperties;
  employeeOvertime: EmployeeOvertimeWithNavigationProperties;
  notification: Notification;
  status = ["Ask appoval", "Approved", "Rejected"];

  constructor(
    private notificationService: NotificationService,
    private activeRoute: ActivatedRoute,
    private leaveService: LeaveService,
    private overtimeService: OvertimeService,
    private utilService: UtilService,
    private storage: Storage,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.employeeProfile = new EmployeeWithNavigationProperties();
    this.employeeLeave = new EmployeeLeaveWithNavigationProperties();
    this.employeeOvertime = new EmployeeOvertimeWithNavigationProperties();
    this.notification = new Notification();

    this.activeRoute.queryParams.subscribe((routerSnapshot) => {
      this.pageType = routerSnapshot.pageType;
      this.title = routerSnapshot.title;
      this.employee = new EmployeeInformation(routerSnapshot.employee);
      this.notification = new Notification(routerSnapshot.notification);
      switch (this.pageType) {
        case 'employeeLeave':
          this.leaveService.getByIdWithNavigationProperties(routerSnapshot.leaveId)
            .subscribe((employeeLeave) => {
              this.employeeLeave = new EmployeeLeaveWithNavigationProperties(employeeLeave);
            })
          break;

        case 'employeeOvertime':
          this.overtimeService.getByIdWithNavigationProperties(routerSnapshot.overtimeId)
            .subscribe((employeeOvertime) => {
              this.employeeOvertime = new EmployeeOvertimeWithNavigationProperties(employeeOvertime);
            })
          break;

        case 'employeeProfile':
          this.notificationService.getEmployeeByIdWithNavigationProperties(routerSnapshot.employeeId)
            .subscribe((employee) => {
              this.employeeProfile = new EmployeeWithNavigationProperties(employee);
            })
          break;

        default:
          break;
      }
    })
  }

  approved1Status(status: ApprovalStatus) {
    return status === ApprovalStatus.AskApproval ? true : false;
  }

  approve(data: any, status: boolean) {
    switch (this.pageType) {
      case 'employeeLeave':
        this.updateLeave(data, status)
        break;

      case 'employeeOvertime':
        this.updateOvertime(data, status)
        break;

      default:
        break;
    }
  }

  updateLeave(employeeLeave: EmployeeLeaveWithNavigationProperties, status: boolean) {
    let leave = new EmployeeLeave(employeeLeave.employeeLeave);
    const approvedStatus = status ? ApprovalStatus.Approved : ApprovalStatus.Rejected;

    if (leave.approved1Status === ApprovalStatus.AskApproval
      && employeeLeave.approved1.id === this.employee.id
    ) {
      leave.approved1DateTime = new Date();
      leave.approved1Status = approvedStatus;
    }

    if (leave.approved1Status === ApprovalStatus.Approved
      && leave.approved2Status === ApprovalStatus.AskApproval
      && employeeLeave.approved2.id === this.employee.id
    ) {
      leave.approved2DateTime = new Date();
      leave.approved2Status = approvedStatus;
    }

    this.utilService.loadingPresent('Please wait...')
    .then(() => {
      this.leaveService.update(leave).subscribe(() => {
        this.notification.markAsRead = true;
        this.notificationService.update(this.notification)
          .subscribe(() => {
            this.utilService.loadingDismiss();
            this.navCtrl.navigateRoot('/tabs/notification');
          })
      }, () => {
        this.utilService.loadingDismiss();
        this.utilService.alert("Leave request approved failed!");
      });
    });
  }

  updateOvertime(employeeOvertime: EmployeeOvertimeWithNavigationProperties, status: boolean) {
    let overtime = new EmployeeOvertime(employeeOvertime.employeeOvertime);
    const approvedStatus = status ? ApprovalStatus.Approved : ApprovalStatus.Rejected;

    if (overtime.approved1Status === ApprovalStatus.AskApproval
      && employeeOvertime.approved1.id === this.employee.id
    ) {
      overtime.approved1DateTime = new Date();
      overtime.approved1Status = approvedStatus;
    }

    if (overtime.approved1Status === ApprovalStatus.Approved
      && overtime.approved2Status === ApprovalStatus.AskApproval
      && employeeOvertime.approved2.id === this.employee.id
    ) {
      overtime.approved2DateTime = new Date();
      overtime.approved2Status = approvedStatus;
    }

    this.utilService.loadingPresent('Please wait...')
    .then(() => {
      this.overtimeService.update(overtime).subscribe(() => {
        this.notification.markAsRead = true;
        this.notificationService.update(this.notification)
          .subscribe(() => {
            this.utilService.loadingDismiss();
            this.navCtrl.navigateRoot('/tabs/notification');
          })
      }, () => {
        this.utilService.loadingDismiss();
        this.utilService.alert("Overtime request approved failed!");
      });
    });
  }

  action(type: string) {
    switch (type) {
      case 'videoCall':
        console.log(type);
        break;

      case 'telp':
        if (!this.employee.phone) { return }
        window.open(`tel:${this.employee.phone}`);
        break;

      case 'mail':
        if (!this.employee.phone) { return }
        window.open(`mailto:${this.employee.email}`);
        break;

      default:
        break;
    }
  }
}
