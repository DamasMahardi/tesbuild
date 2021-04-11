import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PastEventPage } from './past-event.page';

describe('PastEventPage', () => {
  let component: PastEventPage;
  let fixture: ComponentFixture<PastEventPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PastEventPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PastEventPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
