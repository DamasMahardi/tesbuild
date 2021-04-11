import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '@app/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class HolidayService {

  constructor(
    private httpService: HttpService
  ) { }
   
  get(dateMin: string, dateMax: string): Observable<any> {
    return this.httpService.get(`/api/app/holiday?DateMin=${dateMin}&DateMax=${dateMax}`);
  }
}