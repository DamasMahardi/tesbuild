import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

 
@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.page.html',
  styleUrls: ['./conversation.page.scss'],
})
export class ConversationPage implements OnInit {

  constructor(private route: Router,) { }

  ngOnInit() {
  }
user_profile() {
    this.route.navigate(['./user-profile']);
  } 
}
