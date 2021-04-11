import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { UtilService } from '@app/services/util.service';
import { SalesActivityCreateDto, SalesActivityWithNavigationPropertiesDto, SalesActivitiesDto } from '@app/store/models/sales-activity.model';
import { NavController } from '@ionic/angular';
import { SalesActivityService } from './sales-activity.service';

@Component({
  selector: 'app-sales-activity',
  templateUrl: './sales-activity.page.html',
  styleUrls: ['./sales-activity.page.scss'],
})
export class SalesActivityPage implements OnInit {

  title: string = null;

  isActivity: boolean = true;

  master: string = 'overview';

  salesActivityList: SalesActivityWithNavigationPropertiesDto[];
  customerList: any[];

  constructor(
    private navCtrl: NavController,
    private activeRoute: ActivatedRoute,
    private service: SalesActivityService,
    private utilService: UtilService
  ) {

  }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe((params) => {
      this.title = params.title; 
    });

    this.getSalesActivity();
  }

  ionViewWillEnter() {
    
  }
  
  switchView() {
    this.isActivity = this.isActivity ? false : true;
  }

  getSalesActivity() {
    this.service.getByEmployeeId('')
      .subscribe((data) => {
        this.salesActivityList = data.items;
      });
  }

  getCustomer() {
    this.service.getCustomerByEmployeeId('')
      .subscribe((data) => {
        this.customerList = data.items;
      });
  }

  newActivity() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        pageType: 'new',
        title: 'New Request',
        //data: data
      }
    }
    this.navCtrl.navigateForward('/main/activity/sales-activity/sales-activity-detail', navigationExtras);
  }

  checkIn(item: SalesActivityWithNavigationPropertiesDto) {
    this.utilService.toast('Get Location Check In', 'middle');
  }

  checkOut(item: SalesActivityWithNavigationPropertiesDto) {
    this.utilService.toast('Get Location Check Out', 'middle');
  }

}
