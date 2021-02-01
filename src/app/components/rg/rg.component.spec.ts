import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RgComponent } from './rg.component';

describe('RgComponent', () => {
  let component: RgComponent;
  let fixture: ComponentFixture<RgComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
