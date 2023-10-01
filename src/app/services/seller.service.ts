import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { login, signUp } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
isSellerLoggedIn = new BehaviorSubject<boolean>(false);
isLogedError = new EventEmitter<boolean>(false);
  constructor(private http: HttpClient, private router: Router) { }

  userSignUp(data: signUp){
    this.http.post('http://localhost:3000/sell',
    data,{observe:'response'}).subscribe((result)=>{
    console.log(result);  
    if(result){
      localStorage.setItem('seller',JSON.stringify(result.body));
      this.router.navigate(['seller-home'])
    }
    });
  }
  reloadSeller(){
    if(localStorage.getItem('seller')){
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home'])
    }
  }
  userLogin(data: login){
    this.http.get(`http://localhost:3000/sell?email=${data.email}&password=${data.password}`,
    {observe: 'response'}).subscribe((result:any)=>{
      console.log(result)
      if(result && result.body && result.body.length===1){
        this.isLogedError.emit(false);

        localStorage.setItem('seller', JSON.stringify(result.body));
        this.router.navigate(['seller-home'])
      }
      else{
        console.log("login failed")
        this.isLogedError.emit(true);
      }
    })
  }
}
