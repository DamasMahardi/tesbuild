import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UtilService } from '@app/services/util.service';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { CustomerPage } from '../customer/customer.page';
import { SalesActivityService } from '../sales-activity.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-sales-activity-detail',
  templateUrl: './sales-activity-detail.page.html',
  styleUrls: ['./sales-activity-detail.page.scss'],
})
export class SalesActivityDetailPage implements OnInit {

  title: string = null;

  form: FormGroup;

  constructor(
    private activeRoute: ActivatedRoute,
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private utilService: UtilService,
    private service: SalesActivityService,
    private storage: Storage
  ) {

  }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe((params) => {
      this.title = params.title; 
    });

    this.buildForm();
  }

  ionViewWillEnter() {
    
  }

  buildForm() {
    this.form = this.fb.group({
      no: ['SA-0000', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      remarks: [''],
      customerId: [],
    });
  }

  async selectCustomer() {
    const modal = await this.modalCtrl.create({
      component: CustomerPage,
      componentProps: {
        'employeeId': 'Douglas'
      }
    });

    await modal.present();

    modal.onDidDismiss().then((data) => {
      console.log(data);
    });    
  }

  create() {

  } 

}
