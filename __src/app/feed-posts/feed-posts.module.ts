import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { FeedPostsPageRoutingModule } from './feed-posts-routing.module';

import { FeedPostsPage } from './feed-posts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
	TranslateModule,
    FeedPostsPageRoutingModule
  ],
  declarations: [FeedPostsPage]
})
export class FeedPostsPageModule {}
