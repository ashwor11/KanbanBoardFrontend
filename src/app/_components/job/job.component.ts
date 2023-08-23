import { ViewEncapsulation } from '@angular/compiler';
import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Feedback } from 'src/app/_models/feedback';
import { Job } from 'src/app/_models/job';
import { BoardService } from 'src/app/_services/board/board.service';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent {
 
  @Input() job !: Job;
  @Input() boardId !: number;


  constructor(private _boardService : BoardService) {}
  addNewFeedback(){
    const content : string = "helal"
    this._boardService.addFeedback(this.boardId,this.job.id, content).subscribe(result=>{
      this.job.feedbacks.push(result);
    })
  }

  markJob(){
    if(this.job.isDone){
      this._boardService.markJobAsDone(this.boardId,this.job.id);
    }else{
      this._boardService.markJobAsUnDone(this.boardId,this.job.id);
    }
  }
}
