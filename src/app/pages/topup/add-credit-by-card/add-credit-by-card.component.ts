import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import swal from 'sweetalert2';
import { get } from 'selenium-webdriver/http';
import { Response } from '@angular/http/src/static_response';

@Component({
  selector: 'app-add-credit-by-card',
  templateUrl: './add-credit-by-card.component.html',
  styleUrls: ['./add-credit-by-card.component.scss']
})
export class AddCreditByCardComponent implements OnInit {

  constructor(private router: Router, private http: Http) { }

  ngOnInit() {
  }

  baseUrl = 'http://localhost:4000/api/';
  jsonResults: any;
  accountNumber = window.localStorage.getItem("accountNumber");
  amount: number;
  name;
  card1;
  card2;
  card3;
  card4;
  cvv;

  put(method, accNumber, amount) {
    console.log(this.amount);
    this.http.put(this.baseUrl + method + accNumber,
      [{ amount: this.amount }])
      .subscribe(response => {
        console.log(response.json());
        this.jsonResults = response.json();
      })
  }

  updateAmount(amount) {
    if (this.amount == null || this.amount == undefined || this.amount == 0 ||
      this.name == null || this.name == undefined ||
      this.card1 == null || this.card1 == undefined ||
      this.card2 == null || this.card2 == undefined ||
      this.card3 == null || this.card3 == undefined ||
      this.card4 == null || this.card4 == undefined ||
      this.cvv == null || this.cvv == undefined) {
      swal({
        title: 'Please fill all the fields!',
        type: 'error',
        showConfirmButton: false,
        timer: 1500
      });
    } else {
      this.put('payStation/addCredit/', this.accountNumber, amount);

      setTimeout(() => {
        console.log(this.jsonResults);
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

  // submit(){
  //   this.router.navigate(['/paymentMethod']);
  // }
  cancel() {
    this.router.navigate(['/paymentMethod']);
  }
}
