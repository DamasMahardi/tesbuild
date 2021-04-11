import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NearYouPage } from './near-you.page';

describe('NearYouPage', () => {
  let component: NearYouPage;
  let fixture: ComponentFixture<NearYouPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NearYouPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NearYouPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
