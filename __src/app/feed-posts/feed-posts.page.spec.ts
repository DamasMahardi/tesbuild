import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FeedPostsPage } from './feed-posts.page';

describe('FeedPostsPage', () => {
  let component: FeedPostsPage;
  let fixture: ComponentFixture<FeedPostsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedPostsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FeedPostsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
