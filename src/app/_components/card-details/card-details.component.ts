import { AfterContentInit, AfterViewInit, Component, DoCheck, EventEmitter, Inject, OnChanges, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { Card } from 'src/app/_models/card';
import { Job } from 'src/app/_models/job';
import { BoardService } from 'src/app/_services/board/board.service';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.css'],
  
  
})
export default class CardDetailsComponent  implements AfterViewInit, OnInit{
  public cardNameControl !: FormControl;
  boardId : number = Number(this.data.route.snapshot.paramMap.get('id'));

  @Output() deleteCardEvent : EventEmitter<Card> = new EventEmitter<Card>()


  constructor(@Inject(MAT_DIALOG_DATA) public data:any, private ref:MatDialogRef<CardDetailsComponent>, private _boardService : BoardService){
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
  
  ngOnInit(): void {
    this.cardNameControl = new FormControl('');
  }
  


  ngOnChanges(){
    
    this.cardNameControl.valueChanges
      .pipe(
        debounceTime(400),
        switchMap(term =>{
          return this._boardService.changeCardName(this.boardId,this.data.card)}
          )
      )
      .subscribe();
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

 

}
