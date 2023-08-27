import { Component, Inject } from '@angular/core';
import CardDetailsComponent from '../card-details/card-details.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BoardService } from 'src/app/_services/board/board.service';
import { Person } from 'src/app/_models/person';
import { PersonForBoard } from 'src/app/_models/personForBoard';

@Component({
  selector: 'app-assign-person',
  templateUrl: './assign-person.component.html',
  styleUrls: ['./assign-person.component.css']
})
export class AssignPersonComponent {

  boardId : number = Number(this.data.route.snapshot.paramMap.get('id'));


  constructor(@Inject(MAT_DIALOG_DATA) public data:any, private ref:MatDialogRef<CardDetailsComponent>, private _boardService : BoardService){}


  assignPerson(person : PersonForBoard){
    this._boardService.assignPersonToCard(this.boardId,this.data.card,person).subscribe(result=>{
      this.data.card.assignedPersonId = person.id;
      alert(`Card assigned to ${person.firstName} ${person.lastName}`);
    })
  }

  removeAssignedPerson(){
    this._boardService.removeAssignedPerson(this.boardId,this.data.card).subscribe(result=>{
      this.data.card.assignedPersonId = null;
      alert(`Assign removed.`);
    })
  }

}