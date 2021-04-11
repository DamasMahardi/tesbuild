import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '@app/services/http.service';
import { EmployeeLeave, EmployeeLeaveDetail } from '@app-models';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  constructor(
    private httpService: HttpService
  ) { }

  getByEmployeeId(employeeId: string, maxResultCount: number = 10, skipCount: number = 0): Observable<any> {
    return this.httpService.get(`/api/app/employeeLeave?EmployeeId=${employeeId}&MaxResultCount=${maxResultCount}&SkipCount=${skipCount}`);
  }

  getByApprovedId(employeeId: string, maxResultCount: number = 10, skipCount: number = 0) : Observable<any> {
    return this.httpService.get(`/api/app/employeeLeave?Approved1ById=${employeeId}&MaxResultCount=${maxResultCount}&SkipCount=${skipCount}`);
  }

  getByIdWithNavigationProperties(id: string): Observable<any> {
    return this.httpService.get(`/api/employeeLeave/with-navigation-properties/${id}`);
  }

  add(data: EmployeeLeave): Observable<any> {
    return this.httpService.post('/api/app/employeeLeave', data);
  }

  update(data: EmployeeLeave): Observable<any> {
    return this.httpService.put(`/api/app/employeeLeave/${data.id}`, data);
  }

  delete(id: string): Observable<any> {
    return this.httpService.delete(`/api/app/employeeLeave/${id}`);
  }
  
  getDetail(employeeLeaveId: string): Observable<any> {
    return this.httpService.get(`/api/app/employeeLeaveDetail?EmployeeLeaveId=${employeeLeaveId}`);
  }

  addDetail(data: EmployeeLeaveDetail): Observable<any> {
    return this.httpService.post('/api/app/employeeLeaveDetail', data);
  }

  updateDetail(data: EmployeeLeaveDetail): Observable<any> {
    return this.httpService.put(`/api/app/employeeLeaveDetail/${data.id}`, data);
  }

  deleteDetail(id: string): Observable<any> {
    return this.httpService.delete(`/api/app/employeeLeaveDetail/${id}`);
  }
}
