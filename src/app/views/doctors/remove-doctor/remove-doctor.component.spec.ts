import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveDoctorComponent } from './remove-doctor.component';

describe('RemoveDoctorComponent', () => {
  let component: RemoveDoctorComponent;
  let fixture: ComponentFixture<RemoveDoctorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RemoveDoctorComponent]
    });
    fixture = TestBed.createComponent(RemoveDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
