import { Injectable, ɵresetJitOptions } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isNgTemplate } from '@angular/compiler';

const options = {
  headers:new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  base_url = 'https://burger-house-server.onrender.com'
  
  constructor(private http:HttpClient) {}

  // get all products
  getallitems(){
    // make an api call to server
    return this.http.get(`${this.base_url}/menu/items`)
  }

  // add to cart
  addtocart(item:any){
    const body={
      id:item.id,
      name:item.name,
      price:item.price,
      type:item.type,
      quantity:1
    }
    return this.http.post(`${this.base_url}/addItem`,body,this.appendToken())
  }


  // get cart items
  getcart(){
    return this.http.get(`${this.base_url}/cartItems`,this.appendToken())
  }

  // increment cart item
  incrementcartitem(item:any){
    const body={
      id:item
    }
    return this.http.post(`${this.base_url}/increment`,body,this.appendToken())
  }

  //decrement cart item
  decrementcartitem(item:any){
    const body = {
      id:item
    }
    return this.http.post(`${this.base_url}/decrement`,body,this.appendToken())
  }

  // empty cart
  emptycart(){
    return this.http.delete(`${this.base_url}/emptycart`,this.appendToken())
  }

  // signup
  signup(name:any,email:any,mobile:any,pswd:any){
    const body={
      name,
      email,
      mobile,
      pswd
    }
    return this.http.post(`${this.base_url}/signup`,body)
  }


  // sign in
  signin(email:any,pswd:any){
    const body = {
      email,
      pswd
    }
    return this.http.post(`${this.base_url}/signin`,body)
  }

  // adding header to http request
  appendToken(){
    const token = localStorage.getItem('token')
    let headers = new HttpHeaders()
    if(token){
      headers=headers.append('access-token',token)
      options.headers=headers
    }
    return options
  }

  // get userdetails
  getuserdetails(){
    return this.http.get(`${this.base_url}/userdetails`,this.appendToken())
  }

}
