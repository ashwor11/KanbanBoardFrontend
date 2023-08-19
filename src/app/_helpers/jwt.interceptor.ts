
import {Injectable} from '@angular/core';

import { HttpRequest,HttpHandler,HttpEvent,HttpInterceptor } from '@angular/common/http';
import {Observable, catchError, throwError} from 'rxjs'
import { AuthenticationService } from '../_services/authentication/authentication.service';
import { environment } from 'src/environments/environment.development';
import { Router } from '@angular/router';


@Injectable()
export class JwtInterceptor implements HttpInterceptor{


    constructor(private _auth: AuthenticationService, private router : Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        // add auth header with jwt if user is logged in and request is to the api url
        const person = this._auth.personValue;
        const isLoggedIn = person && person.access_token;
        const isApiUrl = request.url.startsWith(environment.apiUrl);
        if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: {
                    'Authorization': `Bearer ${person.access_token}`
                }
            })
        }

        return next.handle(request).pipe(catchError(err =>{     
                return throwError(()=>err);
        }))
    }
}

