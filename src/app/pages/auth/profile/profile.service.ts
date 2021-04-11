import { Injectable } from '@angular/core';
import { HttpService } from '@app/services/http.service';
import { EmployeeInformationUpdate, ImageSourceDto } from '@app-models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private httpService: HttpService
  ) {

  }

  update(data : EmployeeInformationUpdate) : Observable<any> {
    return  this.httpService.put(`/api/app/employee/${data.id}`, data)
  }

  changeProfilePicture(data : ImageSourceDto) : Observable<any> {
    return  this.httpService.post(`/api/employee/employee-profile-picture`, data)
  }

  getProfilePicture(id : string) : Observable<any> {
    return  this.httpService.get(`/api/employee/employee-profile-picture/${id}`)
  }
}
