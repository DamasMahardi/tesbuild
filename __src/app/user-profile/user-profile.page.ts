import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {
tab: string = "post"; 
private viewType: string;
  constructor(private route: Router,) { }

  ngOnInit() {
  }
	
setViewType(vt) {
    this.viewType = vt;
  }
	
chat() {
    this.route.navigate(['./conversation']);
  } 

}
