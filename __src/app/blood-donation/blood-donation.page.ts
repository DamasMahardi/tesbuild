import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-blood-donation',
  templateUrl: './blood-donation.page.html',
  styleUrls: ['./blood-donation.page.scss'],
})
export class BloodDonationPage implements OnInit {

  constructor(private route: Router,) { }

  ngOnInit() {
  }
  blood_doners() {
    this.route.navigate(['./blood-doners']);
  } 

}
