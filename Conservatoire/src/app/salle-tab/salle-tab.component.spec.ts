import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalleTabComponent } from './salle-tab.component';

describe('SalleTabComponent', () => {
  let component: SalleTabComponent;
  let fixture: ComponentFixture<SalleTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalleTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalleTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
