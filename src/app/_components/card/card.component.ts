import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Card } from 'src/app/_models/card';
import CardDetailsComponent from '../card-details/card-details.component';
import { ActivatedRoute } from '@angular/router';
import { BoardService } from 'src/app/_services/board/board.service';
import { Job } from 'src/app/_models/job';
import { PersonForBoard } from 'src/app/_models/personForBoard';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit{

  @Input()card !: Card;
  @Input() persons !: PersonForBoard[]
  
  person ?: PersonForBoard ;

  @Output() DeleteCardEvent : EventEmitter<Card> = new EventEmitter<Card>()


  constructor(private dialog : MatDialog, private route : ActivatedRoute, private _boardService : BoardService) {}

  ngOnInit() : void{
    if(this.card.assignedPersonId){
      console.log(this.persons);
      this.person = new PersonForBoard();
      this.person = this.persons.find(person => person.id === this.card.assignedPersonId);
    }
  }

  boardId : number = Number(this.route.snapshot.paramMap.get('id'))

  

   markJob(job : Job){
    
    if(job.isDone){
      this._boardService.markJobAsDone(this.boardId,job.id);
    }else{
      this._boardService.markJobAsUnDone(this.boardId,job.id);
    }
  }

  ondeleteCardEvent(item : any){
    debugger
    console.log("delted");
  }
}
