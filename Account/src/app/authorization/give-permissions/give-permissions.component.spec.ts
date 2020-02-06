import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GivePermissionsComponent } from './give-permissions.component';

describe('GivePermissionsComponent', () => {
  let component: GivePermissionsComponent;
  let fixture: ComponentFixture<GivePermissionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GivePermissionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GivePermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
