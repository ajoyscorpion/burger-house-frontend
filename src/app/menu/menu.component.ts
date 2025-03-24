import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { BehaviorSubject } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import {IPayPalConfig,ICreateOrderRequest } from 'ngx-paypal';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  public payPalConfig?: IPayPalConfig;

  checkOutClickStatus:boolean = false
  paymentStatus:boolean=false
  showModalFooter:boolean=true
  showpaypal:boolean=false

  allitems: any = [];
  cartitems : any =[];
  userDetails : any = [];
  totalCartAmount : number =0;
  email:any = localStorage.getItem('email')
  name:any = localStorage.getItem('name')
  flat:any
  state:any
  pincode:any
  addressForm = this.fb.group({
    flatno:[''],
    state:[''],
    pincode:['']
  })

  constructor(private api:ApiService, private fb:FormBuilder){
    
  }

  ngOnInit(): void {
    this.api.getallitems().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.allitems = res
        this.getCart()
      },
      error:(err:any)=>{
        console.log(err);
      }
    })
  }

  //add to cart
  addToCart(item:any){
    this.api.addtocart(item).subscribe({
      next:(res:any)=>{
        console.log(res); 
        this.getCart()
      },
      error:(err:any)=>{
        console.log(err);   
      }
    })  
  }
  

  // get cart 
  getCart(){
    //let email = localStorage.getItem("email")
    this.api.getcart().subscribe({
      next:(res:any)=>{
        this.cartitems = res
        console.log(res);
        this.getCartTotal()
      },
      error:(err:any)=>{
        console.log(err);  
      }
    })
  }

  // increment cart item
  incrementCartItem(id:any){
    this.api.incrementcartitem(id).subscribe({
      next:(res:any)=>{
        this.cartitems = res
        this.getCart()
      },
      error:(err:any)=>{
        console.log(err);
      }
    })
  }


  // decrement cart item
  decrementCartItem(id:any){
    this.api.decrementcartitem(id).subscribe({
      next:(res:any)=>{
        this.cartitems = res
        this.getCart()
      },
      error:(err:any)=>{
        console.log(err);  
      }
    })
  }


  // empty cart
  emptyCart(){
    this.api.emptycart().subscribe({
      next:(res:any)=>{
        //this.cartitems=res
        console.log(res);
        this.getCart()
      },
      error:(err:any)=>{
        console.log(err);
      }
    })
  } 

   //get cart total
   getCartTotal(){
    let total = 0
    this.cartitems.forEach((item:any)=>{
      total+=item.total
      this.totalCartAmount=Math.ceil(total)
    })
  }

  // get user details
  getUserDetails(){
    this.api.getuserdetails().subscribe({
      next:(res:any)=>{
        this.userDetails = res
        console.log(res);
      },
      error:(err:any)=>{
        console.log(err); 
      }
    })
  }

  //checkout
  checkout(){
    if(this.addressForm.valid){
    this.checkOutClickStatus = true
    this.flat=this.addressForm.value.flatno
    this.state=this.addressForm.value.state
    this.pincode=this.addressForm.value.pincode
    }
    else{
    alert("Invalid Form")  
    }
  }

  //pay-pal
  private initConfig(): void {
    //convert cartamount to string
    let amount = this.totalCartAmount.toString()
    this.payPalConfig = {
        currency: 'USD',
        clientId: 'sb',
        createOrderOnClient: (data) => < ICreateOrderRequest > {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'USD',
                    value: amount,
                    breakdown: {
                        item_total: {
                            currency_code: 'USD',
                            value: amount
                        }
                    }
                },
            }]
        },
        advanced: {
            commit: 'true'
        },
        style: {
            label: 'paypal',
            layout: 'vertical'
        },
        onApprove: (data, actions) => {
            console.log('onApprove - transaction was approved, but not authorized', data, actions);
            actions.order.get().then((details:any) => {
                console.log('onApprove - you can get full order details inside onApprove: ', details);
            });

        },
        onClientAuthorization: (data) => {
            console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
            // payment completed
            //this.showSuccess = true;
            //this.toaster.showSuccess("Payment completed successfully. Order has already placed. Thank You","Success")
            //empty cart
            this.emptyCart()
            //paypal hidden
            this.showpaypal = false
            this.showModalFooter=false
            this.paymentStatus
        },
        onCancel: (data, actions) => {
            console.log('OnCancel', data, actions);
            //this.showCancel = true;
            this.showModalFooter = false
            //paypal hidden
            this.showpaypal = false
            setTimeout(()=>{
              //this.showCancel=false
              this.showModalFooter = true
            },5000)

        },
        onError: err => {
            console.log('OnError', err);
            // this.showError = true;
            this.showModalFooter = false
            //paypal hidden
            // this.showpaypal = false
            setTimeout(()=>{
            //   this.showCancel=false
            this.showModalFooter = true
            },5000)
        },
        onClick: (data, actions) => {
            console.log('onClick', data, actions);
        }
    };
  }


  // makepayment click
  makepayment(){
    this.showpaypal=false
    this.initConfig()
  }

}

