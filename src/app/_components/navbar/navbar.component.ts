import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/_services/authentication/authentication.service';
import { CreateBoardDialogComponent } from '../create-board-dialog/create-board-dialog.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private dialog:MatDialog, private router : Router, private auth : AuthenticationService){}

  isLoggedIn$!: Observable<boolean>;

  ngOnInit() {
    this.isLoggedIn$ = this.auth.isLoggedInValue;
    
      
  }


  logout(){
    this.auth.logOut();
    this.router.navigate(['/login']);
  }

  openCreateBoardDialog(){
    const dialogRef = this.dialog.open(CreateBoardDialogComponent, {
      width: '600px',
      position: {top: '10%'},
      
    });
  }
}
