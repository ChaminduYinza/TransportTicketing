import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { get } from 'selenium-webdriver/http';
import { waitForMap } from '@angular/router/src/utils/collection';


@Component({
  selector: 'app-topup',
  templateUrl: './topup.component.html',
  styleUrls: ['./topup.component.css']
})
export class TopupComponent implements OnInit {

  session: any = window.localStorage.getItem("session");

  constructor(private router: Router, private http: Http) {
  }
  ngOnInit() {
    window.localStorage.removeItem("session");
    if (this.session != null) {
      this.router.navigate(['/selectTransaction']);
    }

  }
  baseUrl = 'http://localhost:4000/api/';
  card = '';
  loggedIn = true;
  loggedIn2 = false;
  password = '';
  addCredit = false;
  checkBalance = false;
  creditByCash = false;
  creditByCard = false;
  jsonResults: any

  get(method) {
    this.http.get(this.baseUrl + method).subscribe(data => {
      // Read the result field from the JSON response.
      this.jsonResults = data.json();
    });
  }

  post(method, dataSet) {
    this.http.post(
      this.baseUrl + method,
      dataSet).subscribe(data => {
        //return data.json();
        this.jsonResults = data.json();
      })
  }

  //----------------------------------------------------------------------------------------
  identifyToken() {
    //display error if card number not entered
    if (this.card.length < 1) {
      swal({
        title: 'Please tap your card or scan QR code!',
        type: 'error',
        showConfirmButton: false,
        timer: 1500
      })

    } else {
      //get token details from server
      this.get('payStation/getToken/' + this.card);
      setTimeout(() => {
        if (this.jsonResults == null || this.jsonResults == undefined ||
          this.jsonResults.success == false) {
          swal({
            title: 'Invalid Login Details! Try again!',
            type: 'error',
            showConfirmButton: false,
            timer: 1500
          });
        }
        else {
          swal.setDefaults({
            input: 'password',
            confirmButtonText: 'Submit',
            showCancelButton: true,
            inputPlaceholder: 'Enter your password'
          })
          var steps = [
            'Your user ID: ' + this.jsonResults.pid + '\nEnter your password'
          ]
          let global = this;
          swal.queue(steps).then(function (result) {
            swal.resetDefaults()
            if (result.value != null || result.value != undefined) {
              //set account number to localStorage for later use
              window.localStorage.setItem("accountNumber", global.jsonResults.account_no);

              //set previous result set to null and define json to get new data set
              let credentials = [{
                pid: global.jsonResults.pid,
                password: result.value
              }];
              global.password = result.value;
              global.jsonResults = null;

              //call post method to validate login attempt
              global.post('user/login', credentials);

              setTimeout(() => {
                //validate login details
                if (global.jsonResults == null || global.jsonResults == undefined) {
                  swal({
                    title: 'Invalid Login Details! Try again!',
                    type: 'error',
                    showConfirmButton: false,
                    timer: 1500
                  });
                }
                else if (global.jsonResults.success == false || global.jsonResults.success == 'false') {
                  swal({
                    title: 'Internal Server Error! Try again later!',
                    type: 'error',
                    showConfirmButton: false,
                    timer: 1500
                  });
                }
                else if (global.jsonResults.validLogin == 'false' || global.jsonResults.validLogin == false) {
                  
                  swal({
                    title: 'Invalid Login Details! Try again!',
                    type: 'error',
                    showConfirmButton: false,
                    timer: 1500
                  });
                }
              }, 1000);
            }
            else{
              return;
            }

          }).then(function () {
            setTimeout(() => {

              if (global.jsonResults.validLogin == 'true' || global.jsonResults.validLogin == true) {
                swal({
                  title: 'Successfully Logged in!',
                  type: 'success',
                  showConfirmButton: false,
                  timer: 1500
                })

                global.router.navigate(['/selectTransaction']);
                window.localStorage.setItem("session", global.password);
                window.localStorage.setItem("continue", "login");
              }
            }, 1000);
          });
        }
      }, 1000);
    }


  }

}
