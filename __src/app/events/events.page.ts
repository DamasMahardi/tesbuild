import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {

  constructor(private route: Router,) { }

  ngOnInit() {
  }


 GotToUpcoming_event() {
    this.route.navigate(['./upcoming-event']);
  }  
 GotToPast_event() {
    this.route.navigate(['./past-event']);
  } 
}
