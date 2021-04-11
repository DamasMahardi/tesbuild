import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-matrimony',
  templateUrl: './matrimony.page.html',
  styleUrls: ['./matrimony.page.scss'],
})
export class MatrimonyPage implements OnInit {

  constructor(private route: Router,) { }

  ngOnInit() {
  }

 matrimony_about() {
    this.route.navigate(['./matrimony-about']);
  }
 set_preference() {
    this.route.navigate(['./set-preference']);
  } 
}
