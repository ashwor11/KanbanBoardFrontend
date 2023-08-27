import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignDueDateComponent } from './assign-due-date.component';

describe('AssignDueDateComponent', () => {
  let component: AssignDueDateComponent;
  let fixture: ComponentFixture<AssignDueDateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignDueDateComponent]
    });
    fixture = TestBed.createComponent(AssignDueDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
