import { Component } from '@angular/core';
import { InviteToBoardComponent } from '../invite-to-board/invite-to-board.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(public dialog: MatDialog, private route : ActivatedRoute) {}
  boardId : number = Number(this.route.snapshot.paramMap.get('id'));


  openInviteDialog(): void {
    const dialogRef = this.dialog.open(InviteToBoardComponent, {
      width: '300px',
      data : {
        route : this.route
      }
    });

    
  }
}
