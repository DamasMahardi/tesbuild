import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  title: string = null;

  constructor(
    private activeRoute: ActivatedRoute,
  ) {

  }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe((params) => {
      this.title = params.title; 
    });
  }

  ionViewWillEnter() {
    
  }  

}
