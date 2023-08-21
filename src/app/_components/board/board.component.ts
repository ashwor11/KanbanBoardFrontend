import {Component, Input} from '@angular/core';
import {NgFor} from '@angular/common';
import {CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { BoardService } from 'src/app/_services/board/board.service';
import { Board } from 'src/app/_models/board';
import { MatDialog } from '@angular/material/dialog';
import { CardDetailsComponent } from '../card-details/card-details.component';
import { Card } from 'src/app/_models/card';
import { Column } from 'src/app/_models/column';


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

    addNewCard(column : Column){
      column.cards.push(new Card("Task"));
    }

  public onMouseDown(mouseEvent : MouseEvent){
    if (mouseEvent.detail > 1) mouseEvent.preventDefault();
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
