import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SallesDetailsComponent } from './salles-details.component';

describe('SallesDetailsComponent', () => {
  let component: SallesDetailsComponent;
  let fixture: ComponentFixture<SallesDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SallesDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SallesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
