import { Injectable } from '@angular/core';
import { HttpService } from '@app/services/http.service';
import { Observable } from 'rxjs';
import { Notification } from '@app-models';
import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private httpService: HttpService,
    private fcm: FCM
  ) { }

  // getNotification(): Observable<any> {
  //   return Observable.create((observer) => {
  //     this.fcm.onNotification().subscribe(data => {
  //       observer.next(data)
  //     }, observer.error())
  //   })
  // }

  getNotification() {
    return this.fcm.onNotification().subscribe((data) => {
      if (data.wasTapped) {
        //
      } else {
        //
      }
    });
  }
  

  getToken(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.fcm.getToken().then((deviceTokenId) => {
        resolve(deviceTokenId);
      }).catch((error) => {
        reject(error);
      });
    })
  }

  subscribeTopic(topic: string): void {
    this.fcm.subscribeToTopic(topic)
      .then(() => {
        console.log(`Success subscribe to topic : ${topic}`);
      }).catch((error) => {
        console.log(error);
      });
  }

  unSubscribeTopic(topic: string): void {
    this.fcm.unsubscribeFromTopic(topic)
      .then(() => {
        console.log(`Success subscribe to topic : ${topic}`)
      }).catch((error) => {
        console.log(error);
      });
  }

  addTokenToTopic(token: string, topic: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.callable('subscribeTopic', {
        token: token,
        topic: topic
      }).then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error)
      })
    })
  }

  removeTokenFromTopic(token: string, topic): Promise<any> {
    return new Promise((resolve, reject) => {
      this.callable('unSubscribeTopic', {
        token: token,
        topic: topic
      }).then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error)
      })
    })
  }

  callable(name: any, data: any): Promise<firebase.functions.HttpsCallableResult> {
    const callable = firebase.functions().httpsCallable(name);
    return callable(data);
  }

  get(tenantId: string, maxResultCount: number = 15, skipCount: number = 0): Observable<any> {
    return this.httpService.get(`/api/app/employeeNotification?TenantId=${tenantId}&MarkAsRead=false&MaxResultCount=${maxResultCount}&SkipCount=${skipCount}`);
  }

  getByEmployeeId(tenantId: string, employeeId: string, maxResultCount: number, skipCount: number = 0): Observable<any> {
    return this.httpService.get(`/api/app/employeeNotification?TenantId=${tenantId}&MarkAsRead=false&EmployeeId=${employeeId}&MaxResultCount=${maxResultCount}&SkipCount=${skipCount}`);
  }

  getByDataId(tenantId: string, dataId: string): Observable<any> {
    return this.httpService.get(`/api/app/employeeNotification?TenantId=${tenantId}&MarkAsRead=false&DataId=${dataId}&MaxResultCount=1&SkipCount=0`);
  }

  add(data: Notification) {
    return this.httpService.post('/api/app/employeeNotification', data);
  }

  update(data: Notification) {
    return this.httpService.put(`/api/app/employeeNotification/${data.id}`, data);
  }

  delete(id: string) {
    return this.httpService.delete(`/api/app/employeeNotification/${id}`);
  }

  getEmployeeByIdWithNavigationProperties(employeeId: string) {
    return this.httpService.get(`/api/employee/with-navigation-properties/${employeeId}`);
  }

}
