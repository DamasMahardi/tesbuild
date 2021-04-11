import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '@app/services/http.service';
import { EmployeeAttendance } from '@app-models';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor(
    private httpService: HttpService
  ) { }

  getByEmployeeId(employeeId: string, maxResultCount: number = 10, skipCount: number = 0): Observable<any> {
    return this.httpService.get(`/api/app/employeeAttendance?EmployeeId=${employeeId}&MaxResultCount=${maxResultCount}&SkipCount=${skipCount}`);
  }

  getByApproved1Id(approved1ById: string, maxResultCount: number = 10, skipCount: number = 0) : Observable<any> {
    return this.httpService.get(`/api/app/employeeAttendance?EmployeeId=${approved1ById}&MaxResultCount=${maxResultCount}&SkipCount=${skipCount}`);
  }

  getByIdWithNavigationProperties(id: string): Observable<any> {
    return this.httpService.get(`/api/employeeAttendance/with-navigation-properties/${id}`);
  }

  add(data: EmployeeAttendance): Observable<any> {
    return this.httpService.post('/api/app/employeeAttendance', data);
  }

  update(data: EmployeeAttendance): Observable<any> {
    return this.httpService.put(`/api/app/employeeAttendance/${data.id}`, data);
  }

  delete(id: string): Observable<any> {
    return this.httpService.delete(`/api/app/employeeAttendance/${id}`);
  }

  getToday(employeeId: string): Observable<any> {
    return this.httpService.get(`/api/app/employeeAttendance/${employeeId}/todayWithNavigationProperties`);
  }

  getWorkshift(employeeId: string): Observable<any> {
    return this.httpService.get(`/api/employeeWorkshift/current-with-navigation-properties/${employeeId}`);
  }

  getEmployeeWorkshiftByEffectiveDate(employeeId: string, effectiveDate: string) : Observable<any> {
    return this.httpService.get(`/api/employeeWorkshift/get-by-effective-date?EmployeeId=${employeeId}&EffectiveDateMax=${effectiveDate}`);
  }

  getEmployeeWorkshift(employeeId: string, maxResultCount: number = 10, skipCount: number = 0) : Observable<any> {
    return this.httpService.get(`/api/employeeWorkshift?EmployeeId=${employeeId}&MaxResultCount=${maxResultCount}&SkipCount=${skipCount}`);
  }

  getWebLocation(geo: any): Observable<any> {
    return this.httpService.getWebLocation(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${geo.coords.latitude},${geo.coords.longitude}&key=AIzaSyBaTVlHDndpSgbdDnRsCy2xFJt2tB41NB0`);
  }

  getAttendanceByEmployee(employeeId: string): Observable<any> {
    let dateMin = moment().subtract(20, 'days').startOf('date').toISOString(),
    dateMax = moment().endOf('date').toISOString(),
    dateTimeInMin = moment().subtract(1, 'days').startOf('date').toISOString(),
    dateTimeInMax = moment().endOf('date').toISOString(),
    dayName = new Date().getDay();

    return this.httpService.get(`/api/app/employeeAttendance/attendanceByEmployee?EmployeeId=${employeeId}&DateMin=${dateMin}&DateMax=${dateMax}&DayName=${dayName}&DateTimeInMin=${dateTimeInMin}&DateTimeInMax=${dateTimeInMax}`)
  }

  getLocation(locationId: string) {
    return this.httpService.get(`/api/app/location/${locationId}`);
  }
}
