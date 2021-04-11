import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [      
      {
        path: 'blogs',
        children: [
          {
            path: '',
            loadChildren: () => import('@app-pages/main/blogs/blogs.module').then(m => m.BlogsPageModule)
          },
          {
            path: 'blog-post',
            loadChildren: () => import('@app-pages/main/blogs/blog-post/blog-post.module').then(m => m.BlogPostPageModule)
          }
        ]
      },
      {
        path: 'chats',
        children: [
          {
            path: '',
            loadChildren: () => import('@app-pages/main/chats/chats.module').then(m => m.ChatsPageModule)
          },
          {
            path: 'conversation',
            loadChildren: () => import('@app-pages/main/chats/conversation/conversation.module').then(m => m.ConversationPageModule)
          }
        ]
      },
      {
        path: 'human-resources',
        loadChildren: () => import('@app-pages/main/human-resource/human-resources.module').then(m => m.HumanResourcesModule)
      },
      {
        path: 'learning-management-system',
        loadChildren: () => import('@app-pages/main/learning-management-system/learning-management-system.module').then(m => m.LearningManagementSystemModule)
      },
      {
        path: 'activity',
        children: [
          {
            path: 'sales-activity',
            loadChildren: () => import('@app-pages/main/activity/sales-activity.module').then(m => m.SalesActivityPageModule)
          },
        ]        
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainModule { }
