import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import CardDetailsComponent from '../card-details/card-details.component';
import { BoardService } from 'src/app/_services/board/board.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-assign-due-date',
  templateUrl: './assign-due-date.component.html',
  styleUrls: ['./assign-due-date.component.css']
})
export class AssignDueDateComponent implements OnInit, AfterViewInit{
  boardId : number = Number(this.data.route.snapshot.paramMap.get('id'));
  dateControl !: FormControl;
  date !: Date;
  minDate : Date = new Date(new Date().setHours(0,0,0,0));


  constructor(@Inject(MAT_DIALOG_DATA) public data:any, private ref:MatDialogRef<CardDetailsComponent>, private _boardService : BoardService){}
  ngAfterViewInit(): void {
    this.dateControl.valueChanges.subscribe(result=>{
      this.assignDueDate(result);
    })
  }

  ngOnInit(): void {
    this.dateControl = new FormControl();
    if(this.data.card.dueDate){
      console.log(this.data.card.dueDate)
      debugger

      this.date = this.data.card.dueDate;
    }
  }

  assignDueDate(date : Date){
    this._boardService.assignDueDate(this.boardId, this.data.card,date).subscribe(result=>{
      this.data.card.dueDate = date;
      alert(`assigned due date` );

    });
  }
  removeAssignedDueDate(){
    this._boardService.removeAssignedDueDate(this.boardId,this.data.card).subscribe(result=>{
      this.data.card.dueDate = null;
      alert('removed assigned due date');
    });
  }

}
