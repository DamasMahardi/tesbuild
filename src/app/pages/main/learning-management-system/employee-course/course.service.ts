import { Injectable } from '@angular/core';
import { HttpService } from '@app/services/http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(
    private httpService: HttpService
  ) { }

  get(maxResultCount: number = 10, skipCount: number = 0): Observable<any> {
    return this.httpService.get(`/api/app/course?IsActive=true&MaxResultCount=${maxResultCount}&SkipCount=${skipCount}`);
  }

  getByIdWithNavigationProperties(id: string): Observable<any> {
    return this.httpService.get(`/api/app/course/with-navigation-properties/${id}`);
  }

  add(data: any): Observable<any> {
    return this.httpService.post('/api/app/course', data);
  }

  update(data: any): Observable<any> {
    return this.httpService.put(`/api/app/course/${data.id}`, data);
  }

  delete(id: string): Observable<any> {
    return this.httpService.delete(`/api/app/course/${id}`);
  }

  getCourseDetail(courseId: string) : Observable<any> {
    return this.httpService.get(`/api/app/courseDetail?CourseId=${courseId}`);
  }
}
