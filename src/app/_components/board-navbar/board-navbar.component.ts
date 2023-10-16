import { Component, Input } from '@angular/core';
import { InviteToBoardComponent } from '../invite-to-board/invite-to-board.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonForBoard } from 'src/app/_models/personForBoard';
import { BoardService } from 'src/app/_services/board/board.service';
import { Board } from 'src/app/_models/board';

@Component({
  selector: 'app-board-navbar',
  templateUrl: './board-navbar.component.html',
  styleUrls: ['./board-navbar.component.css']
})
export class BoardNavbarComponent {

  constructor(public dialog: MatDialog, private route : ActivatedRoute, private _boardService : BoardService, private router : Router) {}
  boardId : number = Number(this.route.snapshot.paramMap.get('id'));
  @Input() board !: Board;
  @Input() boardName !: string;
  @Input() persons !: PersonForBoard[]

  currentPersonId : number = JSON.parse(localStorage.getItem('person')!).id;


  

  openInviteDialog(): void {
    const dialogRef = this.dialog.open(InviteToBoardComponent, {
      width: '600px',
      position: {top: '10%'},
      data : {
        route : this.route
      }
    });
  }

  leaveBoard(){
    this._boardService.leaveBoard(this.boardId).subscribe(res=>{
      this.router.navigate(['home']);
    }
    ,err=>{

    })};

  deleteBoard(){
    this._boardService.deleteBoard(this.boardId).subscribe(res=>{
      this.router.navigate(['home']);
    }
    )
  };
}
