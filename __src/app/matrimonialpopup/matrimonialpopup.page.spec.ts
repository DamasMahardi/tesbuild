import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MatrimonialpopupPage } from './matrimonialpopup.page';

describe('MatrimonialpopupPage', () => {
  let component: MatrimonialpopupPage;
  let fixture: ComponentFixture<MatrimonialpopupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatrimonialpopupPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MatrimonialpopupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
