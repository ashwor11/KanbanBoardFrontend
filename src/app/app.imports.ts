import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './_components/login/login.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { JwtInterceptor } from "./_helpers/jwt.interceptor";
import { HomeComponent } from './_components/home/home.component';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { BoardComponent } from './_components/board/board.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

export const COMPONENTS : any[] = [
    LoginComponent,
    HomeComponent,
    BoardComponent
    
];

export const MODULES : any[] = [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule
];

export const PROVIDERS : any[] = [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    
    
];