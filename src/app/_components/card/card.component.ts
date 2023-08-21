import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Card } from 'src/app/_models/card';
import { CardDetailsComponent } from '../card-details/card-details.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  @Input()card !: Card;


  constructor(private dialog : MatDialog) {
    
  }

  openCard(card : Card){
    let dialogRef = this.dialog.open(CardDetailsComponent,{
       width: '60%',
       height: '400px',
       data :{ card : card}
       
     })
     console.log("xd")


   }
}
