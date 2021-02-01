import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SalarieComponent } from './salarie.component';

describe('SalarieComponent', () => {
  let component: SalarieComponent;
  let fixture: ComponentFixture<SalarieComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SalarieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalarieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
