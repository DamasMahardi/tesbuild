import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '@app-pages/page/notifications/notificatios.service';
import { UtilService } from '@app/services/util.service';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';
import { NavController } from '@ionic/angular';
import { NotificationType } from '@app/store/enums/notification-type';
import { LeaveService } from '@app/pages/main/human-resource/employee-leaves/leave.service';
import { OvertimeService } from '@app/pages/main/human-resource/employee-overtimes/overtime.service';
import { 
  Notification,
  EmployeeLeaveWithNavigationProperties, 
  EmployeeLeave,
  EmployeeOvertimeWithNavigationProperties,
  EmployeeOvertime,
  EmployeeInformation
} from '@app-models';
import { ApprovalStatus } from '@app/store/enums';
import { environment } from '@environments/environment.prod';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  notificationList: any[] = [];
  employee: EmployeeInformation;
  tenantId: any = null;

  constructor(
    private route: Router,
    private notificationService: NotificationService,
    private utilService: UtilService,
    private storage: Storage,
    private navCtrl: NavController,
    private leaveService: LeaveService,
    private overtimeService: OvertimeService
  ) { }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.utilService.loadingPresent('Please wait...')
      .then(() => {
        Promise.all([
          this.storage.get(`hure_${environment.appName}_employee`),
          this.storage.get(`hure_${environment.appName}_tenant`)
        ]).then(([employee, tenant]) => {
          this.employee = employee;
          this.tenantId = tenant.tenantId;
          this.getNotification(employee, tenant.tenantId);
        })
      });
  }

  getNotification(employee: EmployeeInformation, tenantId: string) {
    let _notification: any[] = [];
    this.notificationService.get(tenantId, 15, 0).subscribe((result) => {
      _notification = result.items;
      this.utilService.loadingDismiss();

      if (_notification.length > 0) {
        _notification.forEach(item => {
          item['showNotification'] = true;
          item['time'] = moment(item.creationTime).fromNow();
        })

        let findLeaveOvertime = _notification.filter(e =>
          e.notificationType === NotificationType.Leave
          || e.notificationType === NotificationType.Overtime);

        if (findLeaveOvertime.length > 0) {
          for (let i = 0; i < findLeaveOvertime.length; i++) {
            if (findLeaveOvertime[i].approvedId === employee.id 
              || findLeaveOvertime[i].employeeId === employee.id
            ) {
              findLeaveOvertime[i]['showNotification'] = true;
            } else {
              findLeaveOvertime[i]['showNotification'] = false;
            }
          }
        }
        
        this.notificationList = _notification;
      } else {
        this.utilService.loadingDismiss();
        this.notificationList = [];
      }
    });
  }

  notificationType(type: NotificationType) {
    return type === NotificationType.Leave || type === NotificationType.Overtime ? true : false;
  }

  approvedStatus(notification: Notification) {
    return (notification.notificationType === NotificationType.Leave
      && notification.leaveStatus === ApprovalStatus.AskApproval)
      || (notification.notificationType === NotificationType.Overtime
      && notification.overtimeStatus === ApprovalStatus.AskApproval)
      ? true
      : false;
  }

  action(notification: any, status: boolean) {
    let type = notification.notificationType;
    switch (type) {
      case 0:
        this.utilService.loadingPresent('Please wait...')
        .then(() => {
          this.leaveService.getByIdWithNavigationProperties(notification.dataId)
          .subscribe((leave) => {
            this.updateLeave(leave, status, notification);
          }, () => {
            this.utilService.loadingDismiss();
          })
        });
        break;

      case 1:
        this.utilService.loadingPresent('Please wait...')
        .then(() => {
          this.overtimeService.getByIdWithNavigationProperties(notification.dataId)
          .subscribe((overtime) => {
            this.updateOvertime(overtime, status, notification);
          }, () => {
            this.utilService.loadingDismiss();
          })
        });
        break;

      default:
        break;
    }
  }

  updateLeave(
    employeeLeave: EmployeeLeaveWithNavigationProperties,
    status: boolean,
    notification: Notification
  ) {
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

    this.leaveService.update(leave).subscribe(() => {
      notification.markAsRead = true;
      this.notificationService.update(notification)
        .subscribe(() => {
          this.utilService.loadingDismiss();
          this.getNotification(this.employee, this.tenantId)
        })
    }, () => {
      this.utilService.loadingDismiss();
      this.utilService.alert("Leave request approved failed!");
    });
  }

  updateOvertime(
    employeeOvertime: EmployeeOvertimeWithNavigationProperties,
    status: boolean,
    notification: Notification
  ) {
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

    this.overtimeService.update(overtime).subscribe(() => {
      notification.markAsRead = true;
      this.notificationService.update(notification)
        .subscribe(() => {
          this.utilService.loadingDismiss();
          this.getNotification(this.employee, this.tenantId)
        })
    }, () => {
      this.utilService.loadingDismiss();
      this.utilService.alert("Overtime request approved failed!");
    });
  }

  openNotification(notification: any) {
    let _notification = new Notification(notification);
    
    switch (notification.notificationType) {
      case 0:
        this.navCtrl.navigateForward('/page/notification/notification-detail', {
          queryParams: {
            pageType: 'employeeLeave',
            title: 'employee_leave',
            leaveId: _notification.dataId,
            notification: notification,
            employee: this.employee
          }
        })
        break;
        
      case 1:
        this.navCtrl.navigateForward('/page/notification/notification-detail', {
          queryParams: {
            pageType: 'employeeOvertime',
            title: 'employee_overtime',
            overtimeId: _notification.dataId,
            notification: notification,
            employee: this.employee
          }
        })
        break;

      case 2:
        console.log('Announcement');
        break;

      case 3:
        console.log('News');
        break;

      case 4:
        this.navCtrl.navigateForward('/page/notification/notification-detail', {
          queryParams: {
            pageType: 'employeeProfile',
            title: 'employee_profile',
            employeeId: _notification.employeeId,
            notification: notification,
            employee: this.employee
          }
        });
        break;

      default:
        break;
    }
  }

  user_profile(employeeId: string) {
    this.navCtrl.navigateForward('/auth/user-profile', {
      queryParams: {
        employeeId: employeeId
      }
    });
  }

  my_profile() {
    this.route.navigate(['./my-profile']);
  }

  blogs() {
    this.route.navigate(['./blogs']);
  }
}
