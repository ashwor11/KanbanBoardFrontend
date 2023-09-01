import { Component, EventEmitter, Inject } from '@angular/core';
import CardDetailsComponent from '../card-details/card-details.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BoardService } from 'src/app/_services/board/board.service';
import { Person } from 'src/app/_models/person';
import { PersonForBoard } from 'src/app/_models/personForBoard';
import { MatChipSelectionChange } from '@angular/material/chips';

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
      this.data.card.assignedPersonName = person.firstName + " " + person.lastName;
    })
  }

  removeAssignedPerson(){
    this._boardService.removeAssignedPerson(this.boardId,this.data.card).subscribe(result=>{
      this.data.card.assignedPersonId = null;
      this.data.card.assignedPersonName = null;
    })
  }

  handleSelection(event : MatChipSelectionChange, person : PersonForBoard){
    if(event.selected === true){
      this.assignPerson(person)
    }
    else{
      this.removeAssignedPerson();
    }
  }

}
