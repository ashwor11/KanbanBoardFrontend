import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Feedback } from 'src/app/_models/feedback';
import { BoardService } from 'src/app/_services/board/board.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit, AfterViewInit
{

  feedbackContentControl !: FormControl
  @Input() feedback !: Feedback;
  @Input() boardId !: number;
  @Output() deleteFeedbackEvent : EventEmitter<Feedback> = new EventEmitter<Feedback>();

  constructor(private _boardService : BoardService){}
  ngAfterViewInit(): void {
    this.feedbackContentControl.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap(term =>{return this._boardService.changeJobFeedbackContent(this.boardId, this.feedback)})
      ).subscribe();
  }

  ngOnInit(): void {
    this.feedbackContentControl = new FormControl();
    
  }

  isUserAuthorized(writtenByPersonId: number){
    let text  =localStorage.getItem('person')
    let person = JSON.parse(text!)
    return writtenByPersonId == Number(person?.id);
  }

  deleteFeedback(){
    this._boardService.deleteJobFeedback(this.boardId, this.feedback).subscribe(result=>{
      this.deleteFeedbackEvent.emit(this.feedback);
    });

  }
}
