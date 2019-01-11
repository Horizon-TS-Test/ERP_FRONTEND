import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizonTabComponent } from './horizon-tab.component';

describe('HorizonTabComponent', () => {
  let component: HorizonTabComponent;
  let fixture: ComponentFixture<HorizonTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorizonTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorizonTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
