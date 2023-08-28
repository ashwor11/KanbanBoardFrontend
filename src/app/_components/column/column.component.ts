import { AfterViewChecked, AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Card } from 'src/app/_models/card';
import { Column } from 'src/app/_models/column';
import CardDetailsComponent from '../card-details/card-details.component';
import { ActivatedRoute } from '@angular/router';
import { Person } from 'src/app/_models/person';
import { PersonForBoard } from 'src/app/_models/personForBoard';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.css']
})
export class ColumnComponent implements OnChanges  {

  @Input() column !: Column 
  @Input() persons !: PersonForBoard[]

  constructor(private dialog : MatDialog, private route : ActivatedRoute){
    
  }
  ngOnChanges(): void {
    this.column?.cards.forEach(card=> {
      if(card.assignedPersonId){
        let person = this.persons.find(person=>person.id == card.assignedPersonId);
        card.assignedPersonName = person?.firstName + " " + person?.lastName;
      } 
    })
  }
  ngAfterViewChecked(): void {
      
  }

  openCard(card : Card){
    let dialogRef = this.dialog.open(CardDetailsComponent,{
       width: '40%',
       height: '90%',
       data :{
        card : card,
        route : this.route,
        persons : this.persons
      },
      panelClass:['card-details-dialog']
      
      
       
     })
     dialogRef.componentInstance.deleteCardEvent.subscribe((data)=>{
      this.column.cards.splice(this.column.cards.indexOf(card),1);
     })
   }
  
  

  

  
  
}
