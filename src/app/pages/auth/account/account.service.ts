import { Injectable } from '@angular/core';
import { HttpService } from '@app/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private httpService: HttpService
  ) {

  }
}
