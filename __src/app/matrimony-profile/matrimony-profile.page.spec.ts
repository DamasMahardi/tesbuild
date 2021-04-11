import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MatrimonyProfilePage } from './matrimony-profile.page';

describe('MatrimonyProfilePage', () => {
  let component: MatrimonyProfilePage;
  let fixture: ComponentFixture<MatrimonyProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatrimonyProfilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MatrimonyProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
