import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveActivityComponent } from './remove-activity.component';

describe('RemoveActivityComponent', () => {
  let component: RemoveActivityComponent;
  let fixture: ComponentFixture<RemoveActivityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RemoveActivityComponent]
    });
    fixture = TestBed.createComponent(RemoveActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
