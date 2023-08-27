import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignPersonComponent } from './assign-person.component';

describe('AssignPersonComponent', () => {
  let component: AssignPersonComponent;
  let fixture: ComponentFixture<AssignPersonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignPersonComponent]
    });
    fixture = TestBed.createComponent(AssignPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
