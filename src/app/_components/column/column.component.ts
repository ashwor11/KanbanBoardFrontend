import { Component, ElementRef, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Card } from 'src/app/_models/card';
import { Column } from 'src/app/_models/column';
import { CardDetailsComponent } from '../card-details/card-details.component';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.css']
})
export class ColumnComponent {

  @Input() column !: Column 
  
  

  addNewCard(){
    this.column.cards.push(new Card("Task"));
  }

  
  
}
