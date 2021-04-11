import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-set-preference',
  templateUrl: './set-preference.page.html',
  styleUrls: ['./set-preference.page.scss'],
})
export class SetPreferencePage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }
	

 tabs() {
    this.navCtrl.navigateRoot(['./tabs']);
  } 


}
