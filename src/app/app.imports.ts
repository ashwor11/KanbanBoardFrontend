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
import {MatDialogModule} from '@angular/material/dialog'
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AppComponent } from './app.component';
import CardDetailsComponent from './_components/card-details/card-details.component';
import { ColumnComponent } from './_components/column/column.component';
import { CardComponent } from './_components/card/card.component';
import {MatIconModule} from '@angular/material/icon'
import { JobComponent } from './_components/job/job.component';
import { MatCardModule } from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field'
import { NavbarComponent } from './_components/navbar/navbar.component';
import { RegisterComponent } from './_components/register/register.component';
import { InviteToBoardComponent } from './_components/invite-to-board/invite-to-board.component';
import { FeedbackComponent } from './_components/feedback/feedback.component';
import { AcceptInvitationComponent } from './_components/accept-invitation/accept-invitation.component';
import {MatMenuModule} from '@angular/material/menu';
import {PortalModule} from '@angular/cdk/portal';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgxColorsModule } from 'ngx-colors';
import { ColorPickerComponent } from './_components/color-picker/color-picker.component';
import {MatListModule} from '@angular/material/list';
import { CalendarModule } from 'primeng/calendar';








export const COMPONENTS : any[] = [

    AppComponent,
    LoginComponent,
    HomeComponent,
    BoardComponent,
    CardDetailsComponent,
    ColumnComponent,
    CardComponent,
    JobComponent,
    NavbarComponent,
    RegisterComponent,
    InviteToBoardComponent,
    FeedbackComponent,
    AcceptInvitationComponent,
    ColorPickerComponent
    
    
];

export const MODULES : any[] = [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    MatDialogModule,
    MatCheckboxModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatMenuModule,
    PortalModule,
    BrowserAnimationsModule,
    NgxColorsModule,
    MatListModule,
    CalendarModule
];

export const PROVIDERS : any[] = [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    
    
];