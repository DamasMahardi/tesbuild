import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MatrimonyAboutPage } from './matrimony-about.page';

describe('MatrimonyAboutPage', () => {
  let component: MatrimonyAboutPage;
  let fixture: ComponentFixture<MatrimonyAboutPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatrimonyAboutPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MatrimonyAboutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
