import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelectRelationPage } from './select-relation.page';

describe('SelectRelationPage', () => {
  let component: SelectRelationPage;
  let fixture: ComponentFixture<SelectRelationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectRelationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectRelationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
