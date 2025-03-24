import { Component } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  signUpForm = this.fb.group({
    name:["",[Validators.required,Validators.minLength(2),Validators.pattern('[a-zA-Z ]*')]],
    email:['',[Validators.required,Validators.email]],
    mobile:['',[Validators.required,Validators.pattern('[0-9]*'),Validators.maxLength(10),Validators.minLength(10)]],
    password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9 ]*')]]
  })

  constructor(private api:ApiService, private fb:FormBuilder, private joinRouter:Router){

  }

  signUp(){

    if(this.signUpForm.valid){

      let name = this.signUpForm.value.name
      let email = this.signUpForm.value.email
      let mobile = this.signUpForm.value.mobile
      let pswd = this.signUpForm.value.password

      this.api.signup(name,email,mobile,pswd).subscribe({
        next:(res:any)=>{
          console.log(res);
          this.joinRouter.navigateByUrl('signIn') 
        },
        error:(err:any)=>{
          console.log(err);
        }
      })
    }
    else{
      alert("Invalid Form")
    }
  }
}
