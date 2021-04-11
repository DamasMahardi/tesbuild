import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ChatService } from './chat.service';
import { Storage } from '@ionic/storage';
import { EmployeeWithNavigationProperties } from '@app-models';
import { IonInfiniteScroll } from '@ionic/angular';
import { environment } from '@environments/environment.prod';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage implements OnInit {
  @ViewChild(IonInfiniteScroll, { static: true }) infiniteScroll: IonInfiniteScroll;

  employeeList: EmployeeWithNavigationProperties[] = [];
  employee: EmployeeWithNavigationProperties;

  maxResultCount = 10;
  skipCount = 0;
  page = 1;
  loading: boolean = false;

  constructor(
    private navCtrl: NavController,
    private chattingService: ChatService,
    private storage: Storage
  ) {
  }

  ngOnInit() {
    
  }

  ionViewWillEnter() {
    this.loading = true;
    this.storage.get(`hure_${environment.appName}_employee`).then((employee) => {
      this.employee = employee;
      this.getEmployeeList();
    });
  }

  getEmployeeList() {
    this.chattingService.getEmployees(this.maxResultCount, 0)
      .subscribe((result) => {
        this.employeeList = result.items;
        this.loading = false;
      });
  }

  GotToConversation(type: string, employee: EmployeeWithNavigationProperties) {
    switch (type) {
      case 'chatting':
        this.navCtrl.navigateForward('/main/chats/conversation', {
          queryParams: {
            employee1: this.employee,
            employee2: employee
          }
        });
        break;

      case 'videoCall':
        console.log(type);
        break;

      case 'telp':
        if (!employee.employee.phone) { return }
        window.open(`tel:${employee.employee.phone}`);
        break;

      case 'mail':
        if (!employee.employee.phone) { return }
        window.open(`mailto:${employee.employee.email}`);
        break;
        
      default:
        break;
    }
  }

  searchContact(event: string) {
    this.chattingService.getEmployees(this.maxResultCount, 0, event)
      .subscribe((employee) => {
        this.employeeList = employee.items;
      })
  }

  doRefresh(event: any) {
    this.chattingService.getEmployees(this.maxResultCount, 0)
      .subscribe((result) => {
        this.employeeList = result.items;
        this.maxResultCount = 10;
        this.skipCount = 1;
        this.page = 1;
        if (this.infiniteScroll.disabled) {
          this.infiniteScroll.disabled = false;
        }
        event.target.complete();
      });
  }

  loadData(event) {
    this.page++;
    this.skipCount = (this.page - 1) * (this.maxResultCount);

    this.chattingService.getEmployees(this.maxResultCount, this.skipCount)
      .subscribe((result) => {
        result.items.forEach((employee: any) => {
          this.employeeList.push(employee)
        });

        if (this.employeeList.length === result.totalCount) {
          this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
        }

        event.target.complete();
      })
  }
}
