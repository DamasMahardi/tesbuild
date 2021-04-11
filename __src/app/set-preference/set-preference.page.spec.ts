import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SetPreferencePage } from './set-preference.page';

describe('SetPreferencePage', () => {
  let component: SetPreferencePage;
  let fixture: ComponentFixture<SetPreferencePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetPreferencePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SetPreferencePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
