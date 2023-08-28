import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm !: FormGroup;
  returnUrl!: string;
  constructor(
    private fb : FormBuilder,
    private route : ActivatedRoute,
    private router : Router,
    private _auth : AuthenticationService
    ) {}

    ngOnInit(): void {
      this.createForm();
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    get f(){
      return this.registerForm.value;
    }


  createForm() {
    this.registerForm = this.fb.group({
      email : ['',[Validators.required]],
      password : ['',[Validators.required]],
      firstName : ['',[Validators.required]],
      lastName : ['',[Validators.required]],
      confirmPassword : ['',[Validators.required]],

    })
  }

  async submit(){
    const {email,password, firstName, lastName, confirmPassword} = this.f;
    await this._auth.register(email,password,firstName, lastName, confirmPassword).subscribe(res=>{
      this.router.navigateByUrl(this.returnUrl);
    }, err=>{
      
    });
    
  }
}
