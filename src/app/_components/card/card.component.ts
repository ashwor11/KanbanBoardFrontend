import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  
  
})
export class CardComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any, private ref:MatDialogRef<CardComponent>){
    console.log(data.card);
  }

}
