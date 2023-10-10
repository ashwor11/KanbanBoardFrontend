import { Injectable } from '@angular/core';
import {BehaviorSubject, map} from 'rxjs';
import {Person} from 'src/app/_models/person'
import { environment } from 'src/environments/environment.development';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
   
  private isLoggedIn = new BehaviorSubject<boolean>(false);

  public personSubject: BehaviorSubject<Person|null>;


  constructor(private http: HttpClient) {
    this.personSubject = new BehaviorSubject<Person|null>(null);
    this.isLoggedIn = new BehaviorSubject<boolean>(false);
   }

   public get personValue(): Person | null{
    return this.personSubject.value;
   }

   public get isLoggedInValue(){
     return this.isLoggedIn.asObservable();
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
        access_token : res.accessToken.token,
        refresh_token : res.refreshToken
        
      };
      this.personSubject.next(person);
      localStorage.setItem('person', JSON.stringify(person));
      this.isLoggedIn.next(true);
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
        access_token : res.accessToken.token,
        refresh_token : res.refreshToken
      };
      this.isLoggedIn.next(true);
      this.personSubject.next(person);
      localStorage.setItem('person',JSON.stringify(person));
      return person;
    }))
  }

  refreshToken(){
    console.log('refreshing token')
    const url : string = `${environment.apiUrl}auth/refresh`
    const body : any ={token: this.personValue?.access_token,
    refreshToken : this.personValue?.refresh_token}

    return this.http.post<any>(url,body)
    .pipe(map(res=>{
      const person : Person = localStorage.getItem('person') ? JSON.parse(localStorage.getItem('person')!) : null;
      person.access_token = res.accessToken.token;
      person.refresh_token = res.refreshToken;
      this.isLoggedIn.next(true);
      this.personSubject.next(person);
      localStorage.setItem('person',JSON.stringify(person));
      

      return person;
    }))
  }

  logOut(){
    console.log('logging out authentication')
    this.isLoggedIn.next(false);
    this.personSubject.next(null);
    localStorage.removeItem('person');
  }
}


