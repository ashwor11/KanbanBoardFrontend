import { Injectable } from '@angular/core';
import {BehaviorSubject, map} from 'rxjs';
import {Person} from 'src/app/_models/person'
import { environment } from 'src/environments/environment.development';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public personSubject: BehaviorSubject<Person|null>;


  constructor(private http: HttpClient) {
    this.personSubject = new BehaviorSubject<Person|null>(null);
   }

   public get personValue(): Person | null{
    return this.personSubject.value;
   }


  logIn(email:string, password:string){
    const url: string = `${environment.apiUrl}auth/login`;
    const body: any = {email:email, password:password}
    return this.http.post<any>(url,body)
    .pipe(map(res=>{
      const person : Person = {
        access_token : res.token
      };
      this.personSubject.next(person);
      localStorage.setItem('person', JSON.stringify(person));
      return person;
    }))
  }
}


