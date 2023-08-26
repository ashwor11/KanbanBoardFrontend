import { ViewEncapsulation } from '@angular/compiler';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Feedback } from 'src/app/_models/feedback';
import { Job } from 'src/app/_models/job';
import { BoardService } from 'src/app/_services/board/board.service';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit, AfterViewInit {
 
  @Input() job !: Job;
  @Input() boardId !: number;
  jobDescriptionControl !: FormControl


  constructor(private _boardService : BoardService) {}
  

  ngOnInit(): void {
    this.jobDescriptionControl = new FormControl('');
    
  }

  ngAfterViewInit(): void {
    this.jobDescriptionControl.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap(term =>{
          return this._boardService.changeJobDescription(this.boardId,this.job);
        })
      )
      .subscribe();
  }


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
  deleteJob(){
    this._boardService.deleteJob(this.boardId,this.job).subscribe();
  }
}
