import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSiteComponent } from './app-site.component';

describe('AppSiteComponent', () => {
  let component: AppSiteComponent;
  let fixture: ComponentFixture<AppSiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppSiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
