import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SalesActivityService } from '../sales-activity.service';

@Component({
    selector: 'app-customer',
    templateUrl: 'customer.page.html',
    styleUrls: ['./customer.page.scss']
})
export class CustomerPage {

    @Input() employeeId: string;

    customerList: any [];

    constructor(
        private modalCtrl: ModalController,
        private service: SalesActivityService
    ) {
        this.service.getCustomerByEmployeeId('')
            .subscribe((data) => {
                this.customerList = data.items;
            });
    } 
    
    select(item: string) {
        this.modalCtrl.dismiss({
          'item': item
        });
    }
}