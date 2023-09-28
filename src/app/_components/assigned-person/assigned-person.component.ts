import { Component, Input } from '@angular/core';
import { PersonForBoard } from 'src/app/_models/personForBoard';

@Component({
  selector: 'app-assigned-person',
  templateUrl: './assigned-person.component.html',
  styleUrls: ['./assigned-person.component.css']
})
export class AssignedPersonComponent {

  @Input()
  person ?: PersonForBoard | null;

  

  



}
