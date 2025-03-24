import { Component } from '@angular/core';
import { FormBuilder,Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  signInForm = this.fb.group({
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
  })

  constructor(private api:ApiService, private joinRouter:Router, private fb:FormBuilder){

  }

  signIn(){
    if(this.signInForm.valid){
      let email = this.signInForm.value.email
      let pswd = this.signInForm.value.password
      
      this.api.signin(email,pswd).subscribe({
        next:(res:any)=>{
          console.log(res);
          const {preuser,token} = res
          localStorage.setItem("email",preuser.email)
          localStorage.setItem("token",token)
          localStorage.setItem('name',preuser.name)
          alert(`${preuser.name} Login Successfull`)
          //this.joinRouter.navigateByUrl('menu')
          this.navigateAndRefresh()
        },
        error:(err:any)=>{
          console.log(err.error);
        }
      })
    }
    else{
      alert("Invalid Form")
    }
  }

  navigateAndRefresh() {
    const newRoute = ''; // Replace with the route you want to navigate to
    this.joinRouter.navigateByUrl(newRoute, { skipLocationChange: false }).then(() => {
      window.location.reload();
    });
  }

}
