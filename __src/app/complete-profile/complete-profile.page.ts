import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router'
import { MatrimonialpopupPage } from '../matrimonialpopup/matrimonialpopup.page';
@Component({
  selector: 'app-complete-profile',
  templateUrl: './complete-profile.page.html',
  styleUrls: ['./complete-profile.page.scss'],
})
export class CompleteProfilePage implements OnInit {

  constructor(
	private route: Router, 
    private modalController: ModalController,
	) { }

  ngOnInit() {
  }
		
 matrimonialpopup(){
    this.modalController.create({component:MatrimonialpopupPage}).then((modalElement)=>
    {
      modalElement.present();
    }
    )
  }

}
