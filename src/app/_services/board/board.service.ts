import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Board } from 'src/app/_models/board';
import { Observable, catchError, map, pipe } from 'rxjs';
import { Card } from 'src/app/_models/card';
import { Job } from 'src/app/_models/job';
import { Feedback } from 'src/app/_models/feedback';

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
      const feedback : Feedback ={
        content : result.content,
        id : result.id,
        writtenByPersonId : result.writtenByPersonId

      }
      return feedback;
    }));
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

  
}

