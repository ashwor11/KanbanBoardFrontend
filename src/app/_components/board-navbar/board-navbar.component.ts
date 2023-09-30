import { Component, Input } from '@angular/core';
import { InviteToBoardComponent } from '../invite-to-board/invite-to-board.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { PersonForBoard } from 'src/app/_models/personForBoard';

@Component({
  selector: 'app-board-navbar',
  templateUrl: './board-navbar.component.html',
  styleUrls: ['./board-navbar.component.css']
})
export class BoardNavbarComponent {

  constructor(public dialog: MatDialog, private route : ActivatedRoute) {}
  boardId : number = Number(this.route.snapshot.paramMap.get('id'));
  @Input() boardName !: string;
  @Input() persons !: PersonForBoard[]


  openInviteDialog(): void {
    const dialogRef = this.dialog.open(InviteToBoardComponent, {
      width: '600px',
      position: {top: '10%'},
      data : {
        route : this.route
      }
    });

    
  }
}
