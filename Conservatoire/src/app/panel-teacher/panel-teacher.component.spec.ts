import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelTeacherComponent } from './panel-teacher.component';

describe('PanelTeacherComponent', () => {
  let component: PanelTeacherComponent;
  let fixture: ComponentFixture<PanelTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
