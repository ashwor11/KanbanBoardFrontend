import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Job } from 'src/app/_models/job';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.css'],
  
  
})
export class CardDetailsComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any, private ref:MatDialogRef<CardDetailsComponent>){
    console.log(data.card);
  }

  addNewJob(){
    let writtenByPersonId = Number(JSON.parse(localStorage.getItem("person")!).id);
    this.data.card.jobs.push(new Job("Job",writtenByPersonId,))
  }

}
