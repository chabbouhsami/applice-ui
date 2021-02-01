import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TypeContratComponent } from './type-contrat.component';

describe('TypeContratComponent', () => {
  let component: TypeContratComponent;
  let fixture: ComponentFixture<TypeContratComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TypeContratComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeContratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
