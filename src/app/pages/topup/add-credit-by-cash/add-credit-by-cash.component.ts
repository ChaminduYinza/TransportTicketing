import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import swal from 'sweetalert2';
import { get } from 'selenium-webdriver/http';
import { Response } from '@angular/http/src/static_response';

@Component({
  selector: 'app-add-credit-by-cash',
  templateUrl: './add-credit-by-cash.component.html',
  styleUrls: ['./add-credit-by-cash.component.scss']
})
export class AddCreditByCashComponent implements OnInit {

  constructor(private router : Router,private http: Http) { }

  ngOnInit() {
  }
  back(){
    this.router.navigate(['/paymentMethod']);
  }

  baseUrl = 'http://localhost:4000/api/';
  jsonResults: any;
  accountNumber = window.localStorage.getItem("accountNumber");
  amount: number;

  put(method, accNumber, amount) {
    this.http.put(this.baseUrl + method + accNumber,
      [{ amount: this.amount }])
      .subscribe(response => {
        this.jsonResults = response.json();
      })
  }

  updateAmount(amount) {
    if (this.amount == null || this.amount == undefined || this.amount == 0) {
      swal({
        title: 'Please enter the amount!',
        type: 'error',
        showConfirmButton: false,
        timer: 1500
      });
    } else {
      this.put('payStation/addCredit/', this.accountNumber, amount);

      setTimeout(() => {
        if (this.jsonResults != null || this.jsonResults != undefined) {
          swal({
            title: 'Successfully Deposited!',
            type: 'success',
            showConfirmButton: false,
            timer: 1500
          })
          this.router.navigate(['/accBalance']);
          window.localStorage.setItem("balance", this.jsonResults.credit_amount);
        }
        else {
          swal({
            title: 'Internal Server Error! Try again later!',
            type: 'error',
            showConfirmButton: false,
            timer: 1500
          });
        }
      }, 1000);
    }

  }

  cancel() {
    this.router.navigate(['/paymentMethod']);
  }
}
