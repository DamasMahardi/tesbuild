import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feed-posts',
  templateUrl: './feed-posts.page.html',
  styleUrls: ['./feed-posts.page.scss'],
})
export class FeedPostsPage implements OnInit {
  private saveIcon1 = false;
  private saveIcon2 = false;
  private saveIcon3 = false;
  private saveIcon4 = false;
  private saveIcon5 = false;
  private saveIcon6 = false;
  private saveIcon7 = false;
  private saveIcon8 = false;
  private saveIcon9 = false;
  private saveIcon10 = false;
  private saveIcon11 = false;
  private saveIcon12 = false;
	
  private heartIcon1 = false;
  private heartIcon2 = false;
  private heartIcon3 = false;
  private heartIcon4 = false;
  private heartIcon5 = false;
  private heartIcon6 = false;
  private heartIcon7 = false;
  private heartIcon8 = false;
  private heartIcon9 = false;
  private heartIcon10 = false;
  private heartIcon11 = false;
  private heartIcon12 = false;
  constructor(private route: Router,) { }

  ngOnInit() {
  }
	
create_post() {
    this.route.navigate(['./create-post']);
  } 

 toggleSaveIcon1(){
   this.saveIcon1 = !this.saveIcon1;
   } 
 toggleSaveIcon2(){
   this.saveIcon2 = !this.saveIcon2;
   } 
  toggleSaveIcon3(){
   this.saveIcon3 = !this.saveIcon3;
   } 
   toggleSaveIcon4(){
   this.saveIcon4 = !this.saveIcon4;
   } 
  toggleSaveIcon5(){
   this.saveIcon5 = !this.saveIcon5;
   } 
  toggleSaveIcon6(){
   this.saveIcon6 = !this.saveIcon6;
   } 
  toggleSaveIcon7(){
   this.saveIcon7 = !this.saveIcon7;
   } 
  toggleSaveIcon8(){
   this.saveIcon8 = !this.saveIcon8;
   } 
  toggleSaveIcon9(){
   this.saveIcon9 = !this.saveIcon9;
   } 
  toggleSaveIcon10(){
   this.saveIcon10 = !this.saveIcon10;
   } 
   toggleSaveIcon11(){
   this.saveIcon11 = !this.saveIcon11;
   } 
   toggleSaveIcon12(){
   this.saveIcon12 = !this.saveIcon12;
   } 
	
	
   toggleHeartIcon1(){
   this.heartIcon1 = !this.heartIcon1;
   }
	toggleHeartIcon2(){
   this.heartIcon2 = !this.heartIcon2;
   }
	toggleHeartIcon3(){
   this.heartIcon3 = !this.heartIcon3;
   }
	toggleHeartIcon4(){
   this.heartIcon4 = !this.heartIcon4;
   }
	toggleHeartIcon5(){
   this.heartIcon5 = !this.heartIcon5;
   }
	toggleHeartIcon6(){
   this.heartIcon6 = !this.heartIcon6;
   }
	toggleHeartIcon7(){
   this.heartIcon7 = !this.heartIcon7;
   }
	toggleHeartIcon8(){
   this.heartIcon8 = !this.heartIcon8;
   }
	toggleHeartIcon9(){
   this.heartIcon9 = !this.heartIcon9;
   }
	toggleHeartIcon10(){
   this.heartIcon10 = !this.heartIcon10;
   }
	toggleHeartIcon11(){
   this.heartIcon11 = !this.heartIcon11;
   }
	toggleHeartIcon12(){
   this.heartIcon12 = !this.heartIcon12;
   }
	
	
   
}
