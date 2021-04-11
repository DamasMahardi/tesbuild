import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../course.service';
import { DomSanitizer } from '@angular/platform-browser';
import { UtilService } from '@app/services/util.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.page.html',
  styleUrls: ['./course-detail.page.scss'],
})
export class CourseDetailPage implements OnInit {

  details: any;
  courseDetailList: any[] = [];
  width: any;

  constructor(
    private activeRoute: ActivatedRoute,
    private courseService: CourseService,
    private sanitizer: DomSanitizer,
    private utilService: UtilService
  ) { }

  ngOnInit() {
    this.width = window.innerWidth;
    this.activeRoute.queryParams.subscribe((routerSnapshot) => {
      this.details = routerSnapshot.course;

      this.utilService.loadingPresent('Please wait...')
      .then(() => {
        this.courseService.getCourseDetail(this.details.course.id)
        .subscribe((courseDetail) => {
          this.courseDetailList = courseDetail.items;
  
          this.courseDetailList.forEach(item => {
            // https://angular.io/guide/security#bypass-security-apis
            let videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(item.courseDetail.videoUrl);
            item['video'] = videoUrl;
          });
  
          this.utilService.loadingDismiss();
        })
      });
      
    })
  }

}
