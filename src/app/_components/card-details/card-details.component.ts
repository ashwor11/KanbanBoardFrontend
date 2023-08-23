import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Job } from 'src/app/_models/job';
import { BoardService } from 'src/app/_services/board/board.service';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.css'],
  
  
})
export class CardDetailsComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any, private ref:MatDialogRef<CardDetailsComponent>, private _boardService : BoardService){
  }

   boardId : number = Number(this.data.route.snapshot.paramMap.get('id'));
   
  addNewJob(){
    console.log(this.boardId)
    let writtenByPersonId = Number(JSON.parse(localStorage.getItem("person")!).id);

    this._boardService.addJob(this.boardId,this.data.card.id).subscribe(result =>{
      result.description ="Job";
      this._boardService.changeJobDescription(this.boardId,result).subscribe(res =>{})
      this.data.card.jobs.push(result);
    })
    
  }

 

}
