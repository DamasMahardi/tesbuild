import { Injectable } from '@angular/core';
import { HttpService } from '@app/services/http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttendanceSehatService {

  constructor(
    private httpService: HttpService
  ) {

  }

  getAttendanceSehat(employeeId: string, maxResultCount: number = 10, skipCount: number = 0) : Observable<any> {
    return this.httpService.get(`/api/app/employeeAttendanceSehat?EmployeeId=${employeeId}&MaxResultCount=${maxResultCount}&SkipCount=${skipCount}`)
  }
}
