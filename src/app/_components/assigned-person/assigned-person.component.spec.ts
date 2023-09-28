import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedPersonComponent } from './assigned-person.component';

describe('AssignedPersonComponent', () => {
  let component: AssignedPersonComponent;
  let fixture: ComponentFixture<AssignedPersonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignedPersonComponent]
    });
    fixture = TestBed.createComponent(AssignedPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
