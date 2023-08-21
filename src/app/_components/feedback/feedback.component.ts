import { Component, Input } from '@angular/core';
import { Feedback } from 'src/app/_models/feedback';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent {


  @Input() feedback !: Feedback;


  isUserAuthorized(writtenByPersonId: number){
    let text  =localStorage.getItem('person')
    let person = JSON.parse(text!)
    console.log(person);
    return writtenByPersonId == Number(person?.id);
  }

  deleteFeedback(feedbackId: number){
    
  }
}
