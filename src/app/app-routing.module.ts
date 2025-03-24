import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { TitleMenuComponent } from './title-menu/title-menu.component'; 

const routes: Routes = [
  { 
    path: '', component:TitleMenuComponent 
  },
  {
    path:"menu", component:MenuComponent
  },
  {
    path:"signIn",component:SignInComponent
  },
  {
    path:"signUp",component:SignUpComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
