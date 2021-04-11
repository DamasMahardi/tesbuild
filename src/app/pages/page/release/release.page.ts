import { Component, OnInit } from '@angular/core';
import { ReleaseService } from './release.service';

@Component({
  selector: 'app-release',
  templateUrl: './release.page.html',
  styleUrls: ['./release.page.scss'],
})
export class ReleasePage implements OnInit {  

  releaseList: any = [];

  constructor(private realeaseService: ReleaseService) { 
    this.releaseList = this.realeaseService.releaseList();
  }

  ngOnInit() {
  }
}
