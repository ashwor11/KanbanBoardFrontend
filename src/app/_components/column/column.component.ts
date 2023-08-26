import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Card } from 'src/app/_models/card';
import { Column } from 'src/app/_models/column';
import CardDetailsComponent from '../card-details/card-details.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.css']
})
export class ColumnComponent {

  @Input() column !: Column 
  @Output() DeleteCardEvent : EventEmitter<Card> = new EventEmitter<Card>()

  constructor(private dialog : MatDialog, private route : ActivatedRoute){}

  openCard(card : Card){
    let dialogRef = this.dialog.open(CardDetailsComponent,{
       width: '40%',
       height: '90%',
       data :{
        card : card,
        route : this.route
      }
       
     })
     dialogRef.componentInstance.deleteCardEvent.subscribe((data)=>{
      this.column.cards.splice(this.column.cards.indexOf(card),1);
     })
   }
  
  

  

  
  
}
