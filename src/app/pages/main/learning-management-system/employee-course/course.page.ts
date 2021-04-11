import { Component, OnInit } from '@angular/core';
import { CourseService } from './course.service';
import { NavController } from '@ionic/angular';
import { UtilService } from '@app/services/util.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.page.html',
  styleUrls: ['./course.page.scss'],
})
export class CoursePage implements OnInit {

  courseList: any[] = [];

  constructor(
    private courseService: CourseService,
    private navCtrl: NavController,
    private utilService: UtilService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.utilService.loadingPresent('Please wait...')
    .then(() => {
      this.courseService.get(10).subscribe((courseList) => {
        this.courseList = courseList.items;
        this.utilService.loadingDismiss();
      })
    });
  }

  detail(course: any) {
    this.navCtrl.navigateForward(`/main/learning-management-system/course/course-detail`, {
      queryParams: {
        course: course
      }
    });
  }

}
