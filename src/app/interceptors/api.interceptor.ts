import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { throwError, from } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { environment } from '@environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class ApiInterceptor implements HttpInterceptor {

  constructor(private storage: Storage) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const storage = Promise.all([
      this.storage.get(`hure_${environment.appName}_access_token`), 
      this.storage.get(`hure_${environment.appName}_tenant`)]
    );
    return from(storage)
      .pipe(
        switchMap(data => {

          if (data[0]) {
            request = request.clone({
              headers: request.headers
                .set('Authorization', `Bearer  ${data[0].access_token}`)
            })
          }

          if (data[1]) {
            request = request.clone({
              headers: request.headers
                .set('__tenant', data[1].tenantId)
            })
          }

          return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
              if (event instanceof HttpResponse) {
                // do nothing for now
              }
              return event;
            }),
            catchError((error: HttpErrorResponse) => {
              return throwError(error);
            })
          );
        })
      );
  }
}