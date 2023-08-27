import { AfterContentInit, AfterViewInit, Component, DoCheck, EventEmitter, Inject, OnChanges, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { Card } from 'src/app/_models/card';
import { Job } from 'src/app/_models/job';
import { BoardService } from 'src/app/_services/board/board.service';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { AssignPersonComponent } from '../assign-person/assign-person.component';
import { AssignDueDateComponent } from '../assign-due-date/assign-due-date.component';


@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.css'],
  
  
})
export default class CardDetailsComponent  implements AfterViewInit, OnInit{
  public cardNameControl !: FormControl;
  boardId : number = Number(this.data.route.snapshot.paramMap.get('id'));

  @Output() deleteCardEvent : EventEmitter<Card> = new EventEmitter<Card>()


  constructor(@Inject(MAT_DIALOG_DATA) public data:any, private ref:MatDialogRef<CardDetailsComponent>, private _boardService : BoardService, private dialog:MatDialog){
  }
  
  ngOnInit(): void {
    this.cardNameControl = new FormControl('');
  }
  ngAfterViewInit(): void {
    
    this.cardNameControl.valueChanges
      .pipe(
        debounceTime(400),
        switchMap(term =>{
          return this._boardService.changeCardName(this.boardId,this.data.card)}
          )
      )
      .subscribe();
  }
  
  openAssignPerson(){
    let dialogRef = this.dialog.open(AssignPersonComponent,{
      width: '40%',
      height: '30%',
      data :{
       card : this.data.card,
       route : this.data.route,
       persons : this.data.persons
     },
     
     
    })
  }

  openAssignDate(){
    let dialogRef = this.dialog.open(AssignDueDateComponent,{
      width: '60%',
      height: '60%',
      data :{
       card : this.data.card,
       route : this.data.route,
     },
     
     
    })
  }


  addNewJob(){
    console.log(this.boardId)
    let writtenByPersonId = Number(JSON.parse(localStorage.getItem("person")!).id);

    this._boardService.addJob(this.boardId,this.data.card.id).subscribe(result =>{
      result.description ="Job";
      this._boardService.changeJobDescription(this.boardId,result).subscribe(res =>{})
      this.data.card.jobs.push(result);
    })

  }

  changeCardName(event : any){
      
    event.
    debounceTime().
    distinctUntilChanged().
    switchMap((value : string)=>{
      return this._boardService.changeCardName(this.boardId,this.data.card)
    })
    .subscribe();
  }

  deleteCard() {
    this._boardService.deleteCard(this.boardId,this.data.card).subscribe(result=>{
      
        this.deleteCardEvent.emit(this.data.card);

      
    });
  }

  changeCardColor(color : string){
    
    this._boardService.changeCardColor(this.boardId,this.data.card, color).subscribe(result=>{
      this.data.card.color = color;
    })
  }

 

}
