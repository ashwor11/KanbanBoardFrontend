import { ViewEncapsulation } from '@angular/compiler';
import { Component, Input } from '@angular/core';
import { Feedback } from 'src/app/_models/feedback';
import { Job } from 'src/app/_models/job';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent {
 
  @Input() job !: Job;

  constructor() {}

  addNewFeedback(){
    let writtenByPersonId = JSON.parse(localStorage.getItem("person")!).id;
    this.job.feedbacks.push(new Feedback("feedback", writtenByPersonId))
  }
}
