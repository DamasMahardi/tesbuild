import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeedPostsPage } from './feed-posts.page';

const routes: Routes = [
  {
    path: '',
    component: FeedPostsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeedPostsPageRoutingModule {}
