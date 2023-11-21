import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListActivitiesComponent } from './list-activities.component';

describe('ListActivitiesComponent', () => {
  let component: ListActivitiesComponent;
  let fixture: ComponentFixture<ListActivitiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListActivitiesComponent]
    });
    fixture = TestBed.createComponent(ListActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
