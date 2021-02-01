import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TypeArticleComponent } from './type-article.component';

describe('TypeArticleComponent', () => {
  let component: TypeArticleComponent;
  let fixture: ComponentFixture<TypeArticleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TypeArticleComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
