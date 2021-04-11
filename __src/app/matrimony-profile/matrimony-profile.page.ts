import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-matrimony-profile',
  templateUrl: './matrimony-profile.page.html',
  styleUrls: ['./matrimony-profile.page.scss'],
})
export class MatrimonyProfilePage implements OnInit {

  constructor(
    private navCtrl: NavController
   ) { }

  ngOnInit() {
  }
	
 tabs() {
    this.navCtrl.navigateRoot(['./tabs']);
  } 

}
