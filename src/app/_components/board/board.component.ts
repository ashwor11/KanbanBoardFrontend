import {Component, Input} from '@angular/core';
import {NgFor} from '@angular/common';
import {CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { BoardService } from 'src/app/_services/board/board.service';
import { Board } from 'src/app/_models/board';
import { MatDialog } from '@angular/material/dialog';
import { CardComponent } from '../card/card.component';
import { Card } from 'src/app/_models/card';


/**
 * @title Drag&Drop connected sorting
 */
@Component({
  selector: 'app-board',
  templateUrl: 'board.component.html',
  styleUrls: ['board.component.css']
})



export class BoardComponent {

  constructor(private _boardService : BoardService, private dialog:MatDialog){}

  @Input() id = 0;

  ngOnInit(){
    this.getBoard(this.id);
  }

    board !: Board;

    getBoard(boardId : number){
      this._boardService.getBoardById(boardId).subscribe(result=>{
        this.board = result;
      }, err=>{});

      console.log(this.board);
    }

    
    openCard(card : Card){
     let dialogRef = this.dialog.open(CardComponent,{
        width: '60%',
        height: '400px',
        data :{ card : card}
        
      })
      console.log("xd")


    }
  
  
  
  
  
  
  
  
    drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  

  

 
    


}
