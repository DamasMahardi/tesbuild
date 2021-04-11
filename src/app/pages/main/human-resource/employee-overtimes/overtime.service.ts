import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '@app/services/http.service';
import { EmployeeOvertime, OvertimeDetail } from '@app-models';

@Injectable({
  providedIn: 'root'
})
export class OvertimeService {

  constructor(
    private httpService: HttpService
  ) { }

  getByEmployeeId(employeeId: string, maxResultCount: number = 10, skipCount: number = 0): Observable<any> {
    return this.httpService.get(`/api/app/employeeOvertime?EmployeeId=${employeeId}&MaxResultCount=${maxResultCount}&SkipCount=${skipCount}`);
  }

  getByApproved1Id(approved1ById: string, maxResultCount: number = 10, skipCount: number = 0) : Observable<any> {
    return this.httpService.get(`/api/app/employeeOvertime?Approved1ById=${approved1ById}&MaxResultCount=${maxResultCount}&SkipCount=${skipCount}`);
  }

  getByIdWithNavigationProperties(id: string): Observable<any> {
    return this.httpService.get(`/api/employeeOvertime/with-navigation-properties/${id}`);
  }
 
  add(data: EmployeeOvertime): Observable<any> {
    return this.httpService.post('/api/app/employeeOvertime', data);
  }

  update(data: EmployeeOvertime): Observable<any> {
    return this.httpService.put(`/api/app/employeeOvertime/${data.id}`, data);
  }

  delete(id: string): Observable<any> {
    return this.httpService.delete(`/api/app/employeeOvertime/${id}`);
  }

  getDetail(employeeOvertimeId: string): Observable<any> {
    return this.httpService.get(`/api/app/employeeOvertimeDetail?EmployeeOvertimeId=${employeeOvertimeId}`);
  }

  addDetail(data: OvertimeDetail): Observable<any> {
    return this.httpService.post('/api/app/employeeOvertimeDetail', data);
  }

  updateDetail(data: OvertimeDetail): Observable<any> {
    return this.httpService.put(`/api/app/employeeOvertimeDetail/${data.id}`, data);
  }

  deleteDetail(id: string): Observable<any> {
    return this.httpService.delete(`/api/app/employeeOvertimeDetail/${id}`);
  }
}

