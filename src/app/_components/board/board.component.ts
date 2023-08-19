import {Component, Input} from '@angular/core';
import {NgFor} from '@angular/common';
import {CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { BoardService } from 'src/app/_services/board/board.service';
import { Board } from 'src/app/_models/board';


/**
 * @title Drag&Drop connected sorting
 */
@Component({
  selector: 'cdk-drag-drop-connected-sorting-example',
  templateUrl: 'board.component.html',
  styleUrls: ['board.component.css']
})



export class BoardComponent {

  constructor(private _boardService : BoardService){}

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



  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

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

  columns = {
     backlog: {title :'Backlog', id:'backlog', cards: [{ title: 'Task 1' }, { title: 'Task 2 12312 3ıu12hı3uj12 oı312ıuh3ıu 12uh3 12hu 3huu132 ıh' }] },
     toDo: {title :'To Do', id:'toDo', cards: [{ title: 'Task 1' }, { title: 'Task 2' }] },
     inProgress: {title :'In Progress', id:'inProgress', cards: [{ title: 'Task 1' }, { title: 'Task 2' }] },
     review: {title :'Review', id:'review', cards: [{ title: 'Task 1' }, { title: 'Task 2' }] },
     done: {title :'Done', id:'done', cards: [{ title: 'Task 1' }, { title: 'Task 2' }] },

  };

  

 
    


}
