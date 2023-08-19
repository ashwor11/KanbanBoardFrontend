import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Board } from 'src/app/_models/board';
import { Observable, catchError, map, pipe } from 'rxjs';

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

  

}
