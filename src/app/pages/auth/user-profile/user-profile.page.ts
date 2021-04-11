import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeWithNavigationProperties } from '@app-models';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {

  tab: string = "post";
  public viewType: string;
  employee: EmployeeWithNavigationProperties = new EmployeeWithNavigationProperties();

  constructor(
    private route: Router,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe((routerSnapshot) => {
      this.employee = new EmployeeWithNavigationProperties(routerSnapshot.employee);
    })
  }

  setViewType(vt) {
    this.viewType = vt;
  }

  action(type: string) {
    switch (type) {
      case 'videoCall':
        console.log(type);
        break;

      case 'telp':
        if (!this.employee.employee.phone) { return }
        window.open(`tel:${this.employee.employee.phone}`);
        break;

      case 'mail':
        if (!this.employee.employee.email) { return }
        window.open(`mailto:${this.employee.employee.email}`);
        break;

      default:
        break;
    }
  }

}
