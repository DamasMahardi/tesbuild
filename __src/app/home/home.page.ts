import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private route: Router,) { }

  ngOnInit() {
  }
	
 goToDirectory() {
    this.route.navigate(['./directory']);
  } 
 goToEvents() {
    this.route.navigate(['./events']);
  }  
 goToBlood_donation() {
    this.route.navigate(['./blood-donation']);
  }  
 goToMatrimony() {
    this.route.navigate(['./matrimony']);
  } 
 goToNear_you() {
    this.route.navigate(['./near-you']);
  }  
 goToBlogs() {
    this.route.navigate(['./blogs']);
  }  
 goToContact_us() {
    this.route.navigate(['./contact-us']);
  }  
 goToCommunity_info() {
    this.route.navigate(['./community-info']);
  } 

}
