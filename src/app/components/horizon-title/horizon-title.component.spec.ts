import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizonTitleComponent } from './horizon-title.component';

describe('HorizonTitleComponent', () => {
  let component: HorizonTitleComponent;
  let fixture: ComponentFixture<HorizonTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorizonTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorizonTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
