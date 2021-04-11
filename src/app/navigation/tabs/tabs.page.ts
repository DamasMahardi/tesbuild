import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonTabs } from '@ionic/angular';
import { Subscription } from 'rxjs';

export interface Tab {
  pageWillReload() : any;
}

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit, OnDestroy {
  @ViewChild('tabs', { static: true }) tabs: IonTabs;
  private subs = new Subscription();
  private currentTab: Tab;
  private tabsDidEnter = false;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    const tabSub = this.tabs.ionTabsDidChange.subscribe(() => {
      this.currentTab = this.tabs.outlet.component as Tab;
    });
    this.subs.add(tabSub);
  }

  ionViewWillEnter() {
    if(this.tabsDidEnter && (this.router.url === '/tabs/home' || this.router.url === '/tabs/account')) {
      this.currentTab.pageWillReload();
    }
  }

  ionViewDidEnter() {
    this.tabsDidEnter = true;
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  // How do I make the page always static
  // ion-tabs lifecycle events not working when navigating back from another view
  // https://github.com/ionic-team/ionic-framework/issues/16834#issuecomment-597606961
}
