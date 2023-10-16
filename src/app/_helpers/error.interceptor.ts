import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';

import { AuthenticationService } from '../_services/authentication/authentication.service';
import { Person } from '../_models/person';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor {

    
    constructor(private _auth : AuthenticationService, private router: Router) {}
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    // if token expired try to refresh it
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        return next.handle(request).pipe(catchError(err => {

            if ([ 403].includes(err.status) && this._auth.personValue) {
                alert(err.error.Detail);
                this.router.navigate(["home"]);
            }else if([404].includes(err.status)){
                this.router.navigate(["404"]);
            }else if([400].includes(err.status)){
                alert(err.error.Detail)
                
            }else if ([401].includes(err.status) && this._auth.personValue) {
                console.log('refreshing token')
                return this.handle401Error(request, next);
            }

            //error handled so return without throwing error
            return of(err);
            

        }))

        
        
    }

    private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
            this.refreshTokenSubject.next(null);

            return this._auth.refreshToken().pipe(
                switchMap((res: any) => {
                    
                    this.refreshTokenSubject.next(res);
                    return next.handle(
                        request.clone({
                            setHeaders: {
                                'Authorization': `Bearer ${res.access_token}`
                            }
                        })
                    );
                }));

        } 
        
}