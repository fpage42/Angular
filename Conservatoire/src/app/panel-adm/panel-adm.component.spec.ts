import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelAdmComponent } from './panel-adm.component';

describe('PanelAdmComponent', () => {
  let component: PanelAdmComponent;
  let fixture: ComponentFixture<PanelAdmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelAdmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
