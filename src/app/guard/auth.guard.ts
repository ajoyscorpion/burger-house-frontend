import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private auth:AuthService,private router:Router){

  }
  canActivate:CanActivateFn=()=>{
    if(this.auth.isLoggedin()){
      return true
    }
    else{
      alert("Please Login to Continue")
      this.router.navigateByUrl('signIn')
    }
  } 
}
