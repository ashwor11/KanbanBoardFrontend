import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './_components/home/home.component';
import { LoginComponent } from './_components/login/login.component';

import { AuthGuard } from "./_guards/auth/auth.guard";
import { BoardComponent } from './_components/board/board.component';
import { RegisterComponent } from './_components/register/register.component';
import { AcceptInvitationComponent } from './_components/accept-invitation/accept-invitation.component';
import { ProfileComponent } from './_components/profile/profile.component';
import { ChangePasswordComponent } from './_components/change-password/change-password.component';
import { ForgottenPasswordComponent } from './_components/forgotten-password/forgotten-password.component';

const routes: Routes = [
  {
    path : '',
    redirectTo : 'home',
    pathMatch : 'full'
  },
  {
    path : 'login',
    component : LoginComponent
  },
  {
    path : 'board/:id',
    component : BoardComponent,
    canActivate : [AuthGuard]
  },
  {
    path : 'home',
    component : HomeComponent,
    canActivate : [AuthGuard]
  }, 
  {
    path: 'register',
    component : RegisterComponent,

  },
  {
    path : 'acceptInvitation',
    component : AcceptInvitationComponent,
    canActivate : [AuthGuard]
  },
  {
    path : 'profile/:id',
    component : ProfileComponent
  },
  {
    path: 'changePassword',
    component : ChangePasswordComponent,
    canActivate : [AuthGuard]
  },
  {
    path : 'forgottenPassword',
    component : ForgottenPasswordComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{bindToComponentInputs:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }