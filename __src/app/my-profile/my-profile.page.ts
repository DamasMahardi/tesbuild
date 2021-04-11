import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage implements OnInit {
tab: string = "post";
private viewType: string;
  constructor(private route: Router,private navCtrl: NavController) { }

  ngOnInit() {
  }
	 
setViewType(vt) {
    this.viewType = vt;
  }
	
	


 user_profile() {
    this.route.navigate(['./user-profile']);
  } 
 add_family_member() {
    this.route.navigate(['./add-family-member']);
  } 

 logout() {
    this.navCtrl.navigateRoot(['./sign-in']);
  } 

}
