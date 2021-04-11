import { Component, OnInit } from '@angular/core';
import { UtilService } from '@app/services/util.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

  constructor(
    private utilService: UtilService
  ) { }

  ngOnInit() {
    this.utilService.notificationAuthentication.subscribe((message) => {
      if(message) {
        this.utilService.toast(message, 'bottom', 4000)
        .then(() => {
          this.utilService.notificationAuthentication.next(null);
        });
      }
    });
  }

}
