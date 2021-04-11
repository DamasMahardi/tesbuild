import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
	
@Component({
  selector: 'app-matrimonialpopup',
  templateUrl: './matrimonialpopup.page.html',
  styleUrls: ['./matrimonialpopup.page.scss'],
})
export class MatrimonialpopupPage implements OnInit {

  constructor(
	private modalController: ModalController,
	private route: Router,
    private navCtrl: NavController
	) { }

  ngOnInit() {
  }
  dismiss(){
   this.modalController.dismiss();
 }
 matrimony_profile() {
    this.route.navigate(['./matrimony-profile']);
	   this.modalController.dismiss();
  } 
 tabs() {
    this.navCtrl.navigateRoot(['./tabs']);
	   this.modalController.dismiss();
  } 
}
 