import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BloodDonersPage } from './blood-doners.page';

describe('BloodDonersPage', () => {
  let component: BloodDonersPage;
  let fixture: ComponentFixture<BloodDonersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodDonersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BloodDonersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
