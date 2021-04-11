import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-near-you',
  templateUrl: './near-you.page.html',
  styleUrls: ['./near-you.page.scss'],
})
export class NearYouPage implements OnInit {
private fabAction1 = false;
private fabAction2 = false;
private fabAction3 = false;
private fabAction4 = false;
private fabAction5 = false;
  constructor(private route: Router,) { }
 
  ngOnInit() { 
  }
	
 reset(){
  this.fabAction1=false;
  this.fabAction2=false;
  this.fabAction3=false;
  this.fabAction4=false;
  this.fabAction5=false; 
  }
	


 toggleFab1(){
	 this.reset();
        this.fabAction1 = !this.fabAction1;
   }
	 
	
 toggleFab2(){
	 this.reset();
        this.fabAction2 = !this.fabAction2;
   }
 toggleFab3(){
	 this.reset();
        this.fabAction3 = !this.fabAction3;
   }
 toggleFab4(){
	 this.reset();
        this.fabAction4 = !this.fabAction4;
   }
 toggleFab5(){
	 this.reset();
        this.fabAction5 = !this.fabAction5;
   }
	
 GotToUserProfile() {
    this.route.navigate(['./user-profile']);
  } 
 

}
