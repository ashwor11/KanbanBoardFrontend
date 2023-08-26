import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BoardService } from 'src/app/_services/board/board.service';

@Component({
  selector: 'app-invite-to-board',
  templateUrl: './invite-to-board.component.html',
  styleUrls: ['./invite-to-board.component.css']
})
export class InviteToBoardComponent {

  email !: string;
  boardId : number = Number(this.data.route.snapshot.paramMap.get('id'));


  constructor(
    public dialogRef: MatDialogRef<InviteToBoardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _boardService : BoardService,
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  invitePerson(){
   this._boardService.invitePersonToBoard(this.boardId,this.email).subscribe(result =>{
    alert(`An invitation email sent to ${this.email}`);
   }, err =>{
    alert(err);
   });
  }
}
