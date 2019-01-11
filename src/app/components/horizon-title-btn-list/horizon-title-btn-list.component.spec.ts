import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizonTitleBtnListComponent } from './horizon-title-btn-list.component';

describe('HorizonTitleBtnListComponent', () => {
  let component: HorizonTitleBtnListComponent;
  let fixture: ComponentFixture<HorizonTitleBtnListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorizonTitleBtnListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorizonTitleBtnListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
