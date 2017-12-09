import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { get } from 'selenium-webdriver/http';
import swal from 'sweetalert2';

@Component({
  selector: 'app-select-transaction',
  templateUrl: './select-transaction.component.html',
  styleUrls: ['./select-transaction.component.scss']
})
export class SelectTransactionComponent implements OnInit {

  constructor(private router: Router, private http: Http) { }

  ngOnInit() {
    if (window.localStorage.getItem("continue") == "null" || window.localStorage.getItem("continue") == undefined) {
      window.localStorage.setItem("session", null);
      window.localStorage.setItem("continue", "login");
      this.sweetAlert();
      this.router.navigate(['/topup']);
    }
  }
  baseUrl = 'http://localhost:4000/api/';
  jsonResults: any;
  accBalance = '';

  get(method) {
    this.http.get(this.baseUrl + method).subscribe(data => {
      // Read the result field from the JSON response.
      this.jsonResults = data.json();
    });
  }

  addCredit() {
    this.router.navigate(['/paymentMethod']);
  }
  balance() {
    let accountNumber = window.localStorage.getItem("accountNumber");
    this.get('payStation/balance/'+accountNumber);
    
    setTimeout(() => {
      if (this.jsonResults != null || this.jsonResults != undefined) {
        this.router.navigate(['/accBalance']);
        this.accBalance = this.jsonResults[0].credit_amount;
        window.localStorage.setItem("balance", this.accBalance);
      }
    }, 1000);
  }
  sweetAlert() {
    let global = this;
    swal({
      title: 'Are you sure?',
      text: "You want to Logout",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Logout!'
    }).then(function (result) {
      if (result.value) {
        swal({
          title: 'Successfully Logged out!',
          type: 'success',
          showConfirmButton: false,
          timer: 1500
        })
        global.router.navigate(['/topup']);
      }
    })
  }
}
