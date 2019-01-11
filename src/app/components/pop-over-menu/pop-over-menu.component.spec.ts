import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopOverMenuComponent } from './pop-over-menu.component';

describe('PopOverMenuComponent', () => {
  let component: PopOverMenuComponent;
  let fixture: ComponentFixture<PopOverMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopOverMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopOverMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
