import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Board } from 'src/app/_models/board';
import { Observable, catchError, map, pipe } from 'rxjs';
import { Card } from 'src/app/_models/card';
import { Job } from 'src/app/_models/job';
import { Feedback } from 'src/app/_models/feedback';
import { Person } from 'src/app/_models/person';
import { PersonForBoard } from 'src/app/_models/personForBoard';

@Injectable({
  providedIn: 'root'
})
export class BoardService {


  
  
  
  
  
  

  constructor(private http:HttpClient) {}

    getBoardsPersonIn() : Observable<Board[]>{
    const url : string = `${environment.apiUrl}board/boards`
    let options = {
      headers : new HttpHeaders()
                  .set('Content-Type', 'application/json')
    }
    
     return this.http.get<Board[]>(url,options);
  }

  getBoardById(boardId : number) : Observable<Board>{
    const url : string = `${environment.apiUrl}board/${boardId}`;
    let options = {
      headers : new HttpHeaders()
                    .set('Content-Type', 'application/json')
    };
    return this.http.get<Board>(url,options);
  }

  addCard(boardId: number) : Observable<Card>{
    const url : string = `${environment.apiUrl}board/${boardId}/addCard`
    
    let options = {
      headers : new HttpHeaders()
                    .set('Content-Type', 'application/json')
    };
    
    return this.http.get<Card>(url,options)
   .pipe(map(res=>{
    const card : Card ={
      id : res.id,
      color : res.color,
      status : res.status,

    }
    return card;

   }))
    
    
  }

  changeCardName(boardId : number, card: Card) : Observable<Card>{
    const url : string = `${environment.apiUrl}board/${boardId}/cards/${card.id}/changeName`
    let body = JSON.stringify(card.name)
    let options = {
      headers : new HttpHeaders()
                    .set('Content-Type', 'application/json')
    }
    
    return this.http.post<Card>(url,body,options);

    

  }

  changeCardStatus(boardId: number, card:Card, status : string) : Observable<Card>{
    const url : string = `${environment.apiUrl}board/${boardId}/cards/${card.id}/changeStatus`
    let body = JSON.stringify(status);
    let options = {
      headers : new HttpHeaders()
                    .set('Content-Type', 'application/json')
    }
    return this.http.post<Card>(url,body,options);

    
  }

  addJob(boardId: number, cardId: number,) : Observable<Job>{
    const url : string = `${environment.apiUrl}board/${boardId}/cards/${cardId}/addJob`
    
    let options = {
      headers : new HttpHeaders()
                    .set('Content-Type', 'application/json')
    };
    
    return this.http.get<Job>(url,options)
   .pipe(map(res=>{
    const job : Job ={
      id : res.id,
      description : res.description,
      isDone : res.isDone,
      feedbacks : []

    }
    return job;}))
  }

  changeJobDescription(boardId: number, job : Job) : Observable<Job>{
    const url : string = `${environment.apiUrl}board/${boardId}/jobs/${job.id}/changeDescription`
    let body = JSON.stringify(job.description)
    let options = {
      headers : new HttpHeaders()
                    .set('Content-Type', 'application/json')
    };

    return this.http.post<Job>(url,body,options);

  }
  addFeedback(boardId: number, jobId: number, content : string) : Observable<Feedback>{
    const url : string = `${environment.apiUrl}board/${boardId}/jobs/${jobId}/addFeedback`;
    let body = JSON.stringify(content)
    let options = {
      headers : new HttpHeaders().
                      set('Content-Type','application/json')
    };

    return this.http.post<Feedback>(url,body,options)
    .pipe(map(result =>{
      var person = JSON.parse(localStorage.getItem('person')!);

      const feedback : Feedback ={
        content : result.content,
        id : result.id,
        writtenByPersonId : result.writtenByPersonId,
        writtenByPersonName : person.firstName + " " + person.lastName


      }
      
      return feedback;
    }));
  }

  changeJobFeedbackContent(boardId: number, feedback : Feedback) : Observable<Feedback>{
    const url : string = `${environment.apiUrl}board/${boardId}/jobFeedbacks/${feedback.id}/changeFeedback`;
    let body = JSON.stringify(feedback.content)
    let options = {
      headers : new HttpHeaders().
                      set('Content-Type','application/json')
    };

    return this.http.post<Feedback>(url,body,options);
  }

  markJobAsUnDone(boardId: number, jobId: number) {
    const url : string = `${environment.apiUrl}board/${boardId}/jobs/${jobId}/markAsUnDone`
    let options ={
      headers : new HttpHeaders()
                      .set('Content-Type', 'application-json')
    }

   this.http.get(url,options).subscribe();
  }




  markJobAsDone(boardId: number, jobId: number) {
    const url : string = `${environment.apiUrl}board/${boardId}/jobs/${jobId}/markAsDone`
    let options ={
      headers : new HttpHeaders()
                      .set('Content-Type', 'application-json')
    }
    
   this.http.get(url,options).subscribe()
  }

  deleteJob(boardId: number, job: Job)  : Observable<any>{
    const url : string = `${environment.apiUrl}board/${boardId}/jobs/${job.id}/delete`
    let options ={
      headers : new HttpHeaders()
                      .set('Content-Type', 'application-json')
    }

    return this.http.delete(url);

  }

  deleteJobFeedback(boardId: number, feedback : Feedback) : Observable<any>{
    const url : string = `${environment.apiUrl}board/${boardId}/jobFeedbacks/${feedback.id}/delete`
    let options={
      headers : new HttpHeaders()
                      .set('Content-Type','application-json')
    }

    return this.http.delete(url,options);
  }

  deleteCard(boardId : number, card : Card) : Observable<any>{
    const url : string = `${environment.apiUrl}board/${boardId}/cards/${card.id}/delete`
    let options={
      headers : new HttpHeaders()
                      .set('Content-Type','application-json')
    }

    return this.http.delete(url, options);
  }

  invitePersonToBoard(boardId : number, email : string) : Observable<any>{
    const url : string = `${environment.apiUrl}board/${boardId}/invitePersonToBoard`
    let body = {
      invitationAcceptUrlPrefix : window.location.origin + "/acceptInvitation",
      invitedPersonEmail : email 
    }
    let options = {
      headers : new HttpHeaders()
                      .set('Content-Type','application/json')
    }
    return this.http.post(url,body,options);

  }

  acceptBoardInvitation(invitationAcceptToken: string | null) {
    const url : string = `${environment.apiUrl}board/acceptInvitation?InvitationAcceptToken=${invitationAcceptToken}`;
    let options = {
      headers : new HttpHeaders()
                      .set('Content-Type','application/json')
    }
    return this.http.get(url,options);
    
  }

  changeCardColor(boardId: number, card: any, color: string) {
    const url : string = `${environment.apiUrl}board/${boardId}/cards/${card.id}/changeColor`
    let body = JSON.stringify(color);
    let options = {
      headers : new HttpHeaders()
                      .set('Content-Type','application/json')
    }
    return this.http.post(url,body,options);

  }

  assignPersonToCard(boardId: number, card: any, person: PersonForBoard) {
    const url : string = `${environment.apiUrl}board/${boardId}/cards/${card.id}/assignPerson`
    let body = JSON.stringify(person.id);
    let options = {
      headers : new HttpHeaders()
                      .set('Content-Type','application/json')
    }
    return this.http.post(url,body,options);
  }

  removeAssignedPerson(boardId: number, card: any){
    const url : string = `${environment.apiUrl}board/${boardId}/cards/${card.id}/removeAssignedPerson`
    let options = {
      headers : new HttpHeaders()
                      .set('Content-Type','application/json')
    }
    return this.http.get(url,options);
  }

  assignDueDate(boardId: number, card: Card, date: Date) {
    const url : string = `${environment.apiUrl}board/${boardId}/cards/${card.id}/assignDueDate`
    let body = JSON.stringify(date);
    let options = {
      headers : new HttpHeaders()
                      .set('Content-Type','application/json')
    }
    return this.http.post(url,body,options);
  }

  removeAssignedDueDate(boardId: number, card:Card){
    const url : string = `${environment.apiUrl}board/${boardId}/cards/${card.id}/removeAssignedDueDate`
    let options = {
      headers : new HttpHeaders()
                      .set('Content-Type','application/json')
    }
    return this.http.get(url,options);
  }

  
}

