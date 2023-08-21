import { Component, ViewEncapsulation } from '@angular/core';
import { AuthenticationService } from './_services/authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'Kanban-Board-Frontend';

  constructor(private _auth:AuthenticationService) {
    let person = localStorage.getItem('person');
    if(typeof person !== undefined && typeof person !== null && _auth.personValue == null){
      _auth.personSubject.next(JSON.parse(person!));
    } 

  }

  public onMouseDown(mouseEvent : MouseEvent){
    if (mouseEvent.detail > 1) mouseEvent.preventDefault();
  }
}
