import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardNavbarComponent } from './board-navbar.component';

describe('BoardNavbarComponent', () => {
  let component: BoardNavbarComponent;
  let fixture: ComponentFixture<BoardNavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BoardNavbarComponent]
    });
    fixture = TestBed.createComponent(BoardNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
