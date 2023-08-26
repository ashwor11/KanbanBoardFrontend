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
        id : res.id,
        firstName : res.firstName,
        lastName : res.lastName,
        email : res.email,
        access_token : res.accessToken.token
        
      };
      this.personSubject.next(person);
      localStorage.setItem('person', JSON.stringify(person));
      return person;
    }))
  }

  register(email: string, password: string, firstName: string, lastName: string, confirmPassword: string) {
    const url : string = `${environment.apiUrl}auth/register`
    const body : any ={email:email, password : password, confirmPassword : confirmPassword,firstName:firstName, lastName: lastName }

    return this.http.post<any>(url,body)
    .pipe(map(res=>{
      const person : Person ={
        id : res.id,
        firstName : res.firstName,
        lastName : res.lastName,
        email : res.email,
        access_token : res.accessToken.token
      };
      this.personSubject.next(person);
      localStorage.setItem('person',JSON.stringify(person));
      return person;
    }))
  }

  logOff(){
    localStorage.removeItem('person');
  }
}


