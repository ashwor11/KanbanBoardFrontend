import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-due-date',
  templateUrl: './due-date.component.html',
  styleUrls: ['./due-date.component.css']
})
export class DueDateComponent {
  @Input() dueDate?: Date | null;

 changeDivColorWithDate() {  
    if (this.dueDate) {
      const today = new Date();
      const dueDate = new Date(this.dueDate);
      const daysDifference = Math.floor((dueDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
      if (daysDifference < 0) {
        return 'red-box';
      } else if (daysDifference < 1) {
        return 'orange-box';
      } else if (daysDifference < 3) {
        return 'yellow-box';
      } else {
        return 'green-box';
      }
    }
    return;
}
}
