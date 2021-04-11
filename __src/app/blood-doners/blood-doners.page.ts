import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-blood-doners',
  templateUrl: './blood-doners.page.html',
  styleUrls: ['./blood-doners.page.scss'],
})
export class BloodDonersPage implements OnInit {

  constructor(private route: Router,) { }

  ngOnInit() {
  }
	 GotToUserProfile() {
    this.route.navigate(['./user-profile']);
  } 
}
