import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { UtilService } from '@app/services/util.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.page.html',
  styleUrls: ['./add-employee.page.scss'],
})
export class AddEmployeePage implements OnInit {

  employeeList: any[] = [];
  employeeSelected: any[] = [];

  maxResultCount = 10;
  page = 1;
  isShowButton: boolean = true;
  isTotalCount: boolean = false;

  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private utilService: UtilService
  ) { }

  ngOnInit() {
    this.utilService.loadingPresent('Please wait...');
    this.employeeSelected = this.navParams.data.employeeSelected;

    // Get Employee
    // this.profileService.get(this.maxResultCount).then((employeeList) => {
    //   this.employeeList = employeeList.items;

    //   this.employeeList.forEach(item => {
    //     item['selected'] = false;

    //     for(let i = 0; i < this.employeeSelected.length; i++) {
    //       let findEmployee = this.employeeList.filter(e => e.employee.id === this.employeeSelected[i].id);
    //       if(findEmployee.length > 0) {
    //           findEmployee.forEach(item => {
    //             item['selected'] = true;
    //           })
    //       }
    //     }
    //   });

    //   console.log(this.employeeList);
    //   this.isShowButton = true;
    //   this.isTotalCount = false;
    //   this.utilService.loadingDismiss();
    // });
  }

  selectEmployee(employee) {
    if (!employee.selected) {
      employee.selected = !employee.selected;
      this.employeeSelected.push(employee.employee)
    } else {
      employee.selected = !employee.selected;
      for (let i = 0; i < this.employeeSelected.length; i++) {
        if (this.employeeSelected[i].id === employee.employee.id) {
          this.employeeSelected.splice(i, 1);
        }
      }
    }
  }

  pagination() {
    this.isShowButton = false;
    this.page++;
    let skipCount = (this.page - 1) * this.maxResultCount;

    // this.profileService.get(this.maxResultCount, skipCount).then((employeeList) => {
    //   setTimeout(() => {
    //     employeeList.items.forEach(item => {
    //       item['selected'] = false;
    //       this.employeeList.push(item);
    //       this.employeeList.forEach(employee => {
    //         employee['selected'] = false;
    
    //         for(let i = 0; i < this.employeeSelected.length; i++) {
    //           let findEmployee = this.employeeList.filter(e => e.employee.id === this.employeeSelected[i].id);
    //           if(findEmployee.length > 0) {
    //               findEmployee.forEach(item => {
    //                 item['selected'] = true;
    //               })
    //           }
    //         }
    //       });

    //       console.log(this.employeeList);
    //       this.isShowButton = true;
    //       if (employeeList.totalCount === this.employeeList.length) {
    //         this.isTotalCount = true;
    //       }
    //     });
    //   }, 500);
    // });
  }

  addEmployee() {
    this.modalCtrl.dismiss({
      employeeSelected : this.employeeSelected
    });
  }

  modalDismiss() {
    this.modalCtrl.dismiss();
  }

}
