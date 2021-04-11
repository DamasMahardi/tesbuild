import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-family-member',
  templateUrl: './add-family-member.page.html',
  styleUrls: ['./add-family-member.page.scss'],
})
export class AddFamilyMemberPage implements OnInit {

  constructor(private route: Router,) { }

  ngOnInit() {
  }
	
GotToSelectRelation() {
    this.route.navigate(['./select-relation']);
  } 

}
