import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BloodDonationPage } from './blood-donation.page';

describe('BloodDonationPage', () => {
  let component: BloodDonationPage;
  let fixture: ComponentFixture<BloodDonationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodDonationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BloodDonationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
