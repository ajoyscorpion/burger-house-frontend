import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: string = '';
  showButton: boolean = false;

  constructor(private navbarRouter:Router){}

  ngOnInit(): void {
    //this.user=localStorage.getItem("name") || "Accounts" 
    const userName = localStorage.getItem("name");
    if (userName) {
      this.user = userName;
      this.showButton = false
    }else{
      this.user = "Accounts"
      this.showButton = true
    }
  }
  //

  logout(){
    localStorage.removeItem("name")
    localStorage.removeItem("email")
    localStorage.removeItem("token")
    this.navigateAndRefresh()
  }

  navigateAndRefresh() {
    const newRoute = ''; 
    this.navbarRouter.navigateByUrl(newRoute, { skipLocationChange: false }).then(() => {
      window.location.reload();
    });
  }

}
