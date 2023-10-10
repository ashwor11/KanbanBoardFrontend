import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/_services/authentication/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private router : Router, private auth : AuthenticationService){}

  isLoggedIn$!: Observable<boolean>;

  ngOnInit() {
    this.isLoggedIn$ = this.auth.isLoggedInValue;
    console.log("authenticate the value of islogged" )

  }


  logout(){
    console.log("logout")
    this.auth.logOut();
    this.router.navigate(['/login']);
  }
}
