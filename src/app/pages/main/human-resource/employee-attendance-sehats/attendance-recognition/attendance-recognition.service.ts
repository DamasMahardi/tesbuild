import { Injectable } from '@angular/core';
import { HttpService } from '@app/services/http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttendanceRecognitionService {

  constructor(
    private httpService: HttpService
  ) {

  }

  getAttendanceRecogion(employeeId: string, dateMin: string, dateMax: string, maxResultCount: number = 10, skipCount: number = 0) : Observable<any> {
    return this.httpService.get(`/api/app/employeeAttendanceRecognition?EmployeeId=${employeeId}&SnapTimeMin=${dateMin}&SnapTimeMax=${dateMax}&MaxResultCount=${maxResultCount}&SkipCount=${skipCount}`);
  }
}
