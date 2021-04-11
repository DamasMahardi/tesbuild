import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-matrimony-about',
  templateUrl: './matrimony-about.page.html',
  styleUrls: ['./matrimony-about.page.scss'],
})
export class MatrimonyAboutPage implements OnInit {
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
