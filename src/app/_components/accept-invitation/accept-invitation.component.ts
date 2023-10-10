import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BoardService } from 'src/app/_services/board/board.service';

@Component({
  selector: 'app-accept-invitation',
  templateUrl: './accept-invitation.component.html',
  styleUrls: ['./accept-invitation.component.css']
})
export class AcceptInvitationComponent {

  constructor(private _boardService : BoardService, private route : ActivatedRoute, private router : Router){}

  accept(){
    let invitationAcceptToken : string  |null = this.route.snapshot.queryParamMap.get("InvitationAcceptToken") ;
    this._boardService.acceptBoardInvitation(invitationAcceptToken).subscribe(result=>{
      this.router.navigate(['/home']);
    },err=>{
      alert(err.error.Detail)
      this.router.navigate(['/home']);

    })
  }
}
