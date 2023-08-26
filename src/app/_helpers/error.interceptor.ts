import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';

import { AuthenticationService } from '../_services/authentication/authentication.service';
import { Person } from '../_models/person';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor {

    
    constructor(private _auth : AuthenticationService, private router: Router) {}


    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        return next.handle(request).pipe(catchError(err => {
            if ([400, 403].includes(err.status) && this._auth.personValue) {
                alert(err.error.Detail);
                this.router.navigate(["login"]);
            }
            if ([401].includes(err.status) && this._auth.personValue) {
                this.router.navigate(["login"]);
                this._auth.logOff();
                alert(err.error.Detail);
            }
            return throwError(()=>err)
        }))
        
    }
}