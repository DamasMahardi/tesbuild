import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '@app/services/http.service';
import { EmployeeLeave, EmployeeLeaveDetail } from '@app-models';
import { SalesActivityCreateDto } from '@app/store/models/sales-activity.model';

@Injectable({
  providedIn: 'root'
})
export class SalesActivityService {

    constructor(
    private httpService: HttpService
    ) { }

    // sales-activity
    getByEmployeeId(employeeId: string, maxResultCount: number = 10, skipCount: number = 0): Observable<any> {
        return this.httpService.get(`/api/app/sales-activities?EmployeeId=${employeeId}&MaxResultCount=${maxResultCount}&SkipCount=${skipCount}`);
    }

    getByIdWithNavigationProperties(id: string): Observable<any> {
        return this.httpService.get(`/api/app/sales-activities/with-navigation-properties/${id}`);
    }

    add(data: SalesActivityCreateDto): Observable<any> {
        return this.httpService.post('/api/app/sales-activities', data);
    }

    update(data: SalesActivityCreateDto, id: string): Observable<any> {
        return this.httpService.put(`/api/app/sales-activities/${id}`, data);
    }

    delete(id: string): Observable<any> {
        return this.httpService.delete(`/api/app/sales-activities/${id}`);
    }

    // customer
    getCustomerByEmployeeId(employeeId: string, maxResultCount: number = 10, skipCount: number = 0): Observable<any> {
        return this.httpService.get(`/api/app/customers?MaxResultCount=${maxResultCount}&SkipCount=${skipCount}`);
    }

    // product
    getProduct(maxResultCount: number = 10, skipCount: number = 0): Observable<any> {
        return this.httpService.get(`/api/app/products?MaxResultCount=${maxResultCount}&SkipCount=${skipCount}`);
    }

    // project
    getProjectByEmployeeId(employeeId: string, maxResultCount: number = 10, skipCount: number = 0): Observable<any> {
        return this.httpService.get(`/api/app/projects?EmployeeId=${employeeId}&MaxResultCount=${maxResultCount}&SkipCount=${skipCount}`);
    }

    // sales-activity-type
    getSalesActivityType(maxResultCount: number = 10, skipCount: number = 0): Observable<any> {
        return this.httpService.get(`/api/app/activity-types&MaxResultCount=${maxResultCount}&SkipCount=${skipCount}`);
    }
}
