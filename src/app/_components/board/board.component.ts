import {Component, Input, ChangeDetectorRef} from '@angular/core';
import {NgFor} from '@angular/common';
import {CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { BoardService } from 'src/app/_services/board/board.service';
import { Board } from 'src/app/_models/board';
import { MatDialog } from '@angular/material/dialog';
import CardDetailsComponent from '../card-details/card-details.component';
import { Card } from 'src/app/_models/card';
import { Column } from 'src/app/_models/column';
import { MatCardModule } from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { Person } from 'src/app/_models/person';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs';



/**
 * @title Drag&Drop connected sorting
 */
@Component({
  selector: 'app-board',
  templateUrl: 'board.component.html',
  styleUrls: ['board.component.css']
})



export class BoardComponent {
  private destroy$ = new Subject<void>();

  constructor(private _boardService : BoardService, private dialog:MatDialog, private cd: ChangeDetectorRef){}

  @Input() id = 0;

  

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  async ngOnInit(){
    await this.getBoard(this.id);
    this.subscribeToUpdates();
  }

    board : Board = new Board();

    getBoard(boardId : number){
      this._boardService.getBoardById(boardId).subscribe(result=>{
        this.board = result;
        this.board.persons = JSON.parse(JSON.stringify(result.persons));
      }, err=>{});
      this.board.backlog.status = 0
      this.board.toDo.status = 1
      this.board.inProgress.status = 2
      this.board.review.status = 3
      this.board.done.status = 4

    }

    private subscribeToUpdates() {
      this._boardService.subscribeToBoard(this.id).pipe(
        takeUntil(this.destroy$)
      ).subscribe({
        next: (updatedBoard: Board) => {
          this.board = updatedBoard;
          this.board.persons = JSON.parse(JSON.stringify(updatedBoard.persons));
          this.board.backlog.status = 0
          this.board.toDo.status = 1
          this.board.inProgress.status = 2
          this.board.review.status = 3
          this.board.done.status = 4

          this.cd.detectChanges();

        },
        error: (error) => {
          console.error('Board subscription error:', error);
        }
      });
    }

    addNewCard(column : Column){
      
      let card : Card;
      this._boardService.addCard(this.board.id).subscribe(result =>{
        result.status = column.id;  
        result.name = "Task"
        result.jobs = [];
        this._boardService.changeCardName(this.board.id,result).subscribe(res =>{})
        this._boardService.changeCardStatus(this.board.id,result,column.id).subscribe(res =>{})
        column.cards.push(result);
      })
    }

  public onMouseDown(mouseEvent : MouseEvent){
    if (mouseEvent.detail > 1) mouseEvent.preventDefault();
  }

  

    
    
  
    
  
  
  
  
  
  
    drop(event: CdkDragDrop<any>, status: string) {
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
    let card : Card = event.item.data as Card;
    this._boardService.changeCardStatus(this.board.id,card,status).subscribe();
  }

  

  

 
    


}
