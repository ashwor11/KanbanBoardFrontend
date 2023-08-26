import { Component } from '@angular/core';
import { Board } from 'src/app/_models/board';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication/authentication.service';
import { BoardService } from 'src/app/_services/board/board.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  boards !: Board[];
constructor(
  private router : Router,
  private _board : BoardService
) { }
 ngOnInit() {
   this.getBoards();
  
}
 getBoards() : void{
  this._board.getBoardsPersonIn().subscribe(result=>{
    this.boards = result
  },err =>{
   
  })
 
}
// logout(){
//   this._auth.logout();
//   this.router.navigate(['/login']);
// }
}
