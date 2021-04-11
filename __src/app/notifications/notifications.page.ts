import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  constructor(private route: Router,) { }

  ngOnInit() {
  }
 user_profile() {
    this.route.navigate(['./user-profile']);
  } 
 my_profile() {
    this.route.navigate(['./my-profile']);
  }  
 blogs() {
    this.route.navigate(['./blogs']);
  } 
}