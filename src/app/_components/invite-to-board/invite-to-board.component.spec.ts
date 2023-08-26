import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteToBoardComponent } from './invite-to-board.component';

describe('InviteToBoardComponent', () => {
  let component: InviteToBoardComponent;
  let fixture: ComponentFixture<InviteToBoardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InviteToBoardComponent]
    });
    fixture = TestBed.createComponent(InviteToBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
