import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import {COMPONENTS, MODULES, PROVIDERS} from "./app.imports";
import { JobComponent } from './_components/job/job.component';
import { FeedbackComponent } from './_components/feedback/feedback.component';
import { BoardNavbarComponent } from './_components/board-navbar/board-navbar.component';
import { RegisterComponent } from './_components/register/register.component';
import { InviteToBoardComponent } from './_components/invite-to-board/invite-to-board.component';
import { AcceptInvitationComponent } from './_components/accept-invitation/accept-invitation.component';
import { ColorPickerComponent } from './_components/color-picker/color-picker.component';
import { AssignPersonComponent } from './_components/assign-person/assign-person.component';
import { AssignDueDateComponent } from './_components/assign-due-date/assign-due-date.component';
import { DueDateComponent } from './_components/due-date/due-date.component';
import { AssignedPersonComponent } from './_components/assigned-person/assigned-person.component';
import { NavbarComponent } from './_components/navbar/navbar.component';



@NgModule({
  declarations: [
    COMPONENTS,
    NavbarComponent,
    

    
    
  ],
  imports: [
    MODULES
  ],
  providers: [
    PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
