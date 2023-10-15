import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Route, Router } from '@angular/router';
import { Board } from 'src/app/_models/board';
import { BoardService } from 'src/app/_services/board/board.service';

@Component({
  selector: 'app-create-board-dialog',
  templateUrl: './create-board-dialog.component.html',
  styleUrls: ['./create-board-dialog.component.css']
})
export class CreateBoardDialogComponent {

  boardName !: string;
  boardDescription !: string;
  
  constructor(public dialogRef: MatDialogRef<CreateBoardDialogComponent>, private _boardService : BoardService, private router : Router) {}

  
  createBoard(){
    this._boardService.createBoard(this.boardName,this.boardDescription).subscribe(result =>{
      this.dialogRef.close();
      this.router.navigate(['/board',result.id]);

    });
  }

}
