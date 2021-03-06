import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { BlogPostPageRoutingModule } from './blog-post-routing.module';

import { BlogPostPage } from './blog-post.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
	TranslateModule,
    BlogPostPageRoutingModule
  ],
  declarations: [BlogPostPage]
})
export class BlogPostPageModule {}
