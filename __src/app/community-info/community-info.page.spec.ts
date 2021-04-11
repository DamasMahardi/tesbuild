import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CommunityInfoPage } from './community-info.page';

describe('CommunityInfoPage', () => {
  let component: CommunityInfoPage;
  let fixture: ComponentFixture<CommunityInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunityInfoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CommunityInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
