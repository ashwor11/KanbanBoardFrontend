import { ViewEncapsulation } from '@angular/compiler';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Feedback } from 'src/app/_models/feedback';
import { Job } from 'src/app/_models/job';
import { Person } from 'src/app/_models/person';
import { BoardService } from 'src/app/_services/board/board.service';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit, AfterViewInit, OnChanges {
 
  @Input() job !: Job;
  @Input() persons !: Person[];

  @Input() boardId !: number;
  jobDescriptionControl !: FormControl


  @Output() deleteJobEvent : EventEmitter<Job> = new EventEmitter<Job>();


  constructor(private _boardService : BoardService, private elRef:ElementRef) {}
  

  ngOnInit(): void {
    this.jobDescriptionControl = new FormControl('');
    
  }

  ngOnChanges() : void{
    this.job?.feedbacks.forEach(feedback=> {
      if(feedback.writtenByPersonId){
        let person = this.persons.find(person=>person.id == feedback.writtenByPersonId);
        feedback.writtenByPersonName = person?.firstName + " " + person?.lastName;
      } 
    })
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

      var textarea = this.elRef.nativeElement.querySelector('#job-description-textarea')
      textarea.parentNode.dataset.replicatedValue  = textarea.value;
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
    this._boardService.deleteJob(this.boardId,this.job).subscribe(result=>{
      this.deleteJobEvent.emit(this.job)
    });
  }

  deleteFeedback(feedback : Feedback){
    this.job.feedbacks.splice(this.job.feedbacks.indexOf(feedback),1);
  }
}
