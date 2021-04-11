import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-select-relation',
  templateUrl: './select-relation.page.html',
  styleUrls: ['./select-relation.page.scss'],
})
export class SelectRelationPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }
 
 add_member() {
    this.navCtrl.navigateRoot(['./tabs']);
  } 
}
