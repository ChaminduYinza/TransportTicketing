import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { get } from 'selenium-webdriver/http';
import { waitForMap } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-swapcard',
  templateUrl: './swapcard.component.html',
  styleUrls: ['./swapcard.component.css']
})
export class SwapcardComponent implements OnInit {

  constructor(private http: Http) { }

  ngOnInit() {
  }
  card: any;
  baseUrl = 'http://127.0.0.1:4000/api/';
  jsonResults: any
  password: any;
  location: any;
  journey:any;

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

  put(method, accNumber, object) {
    this.http.put(this.baseUrl + method + accNumber,object)
      .subscribe(response => {
        // console.log(response.json());
        this.jsonResults = response.json();
      })
  }

  onClick() {
    if (this.card == null || this.card == undefined) {
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
        //invalid card tapped message
        if (this.jsonResults == null || this.jsonResults == undefined ||
          this.jsonResults.success == false) {
          swal({
            title: 'Oops! Invalid attempt!',
            type: 'error',
            showConfirmButton: false,
            timer: 1500
          });
        }
        else {
          //set account number to localStorage for later use
          window.localStorage.setItem("accountNumber", this.jsonResults.account_no);
          window.localStorage.setItem("pid", this.jsonResults.pid);
          this.location = [{
            route_no: "R1",
            start_point: "Kesbewa"
          }];
          //store route number for later use
          window.localStorage.setItem("routeNo", this.location[0].route_no);
          let pid = this.jsonResults.pid;
          this.jsonResults = null;
          this.get('journey/isAvailable/' + pid);
          //check for journey availability
          setTimeout(() => {
            if (this.jsonResults.isJourneyAvailable == false) {
              this.jsonResults = null;
              //check whether credits available or not for a journey
              this.post('account/validateCredit/' + window.localStorage.getItem("accountNumber"), this.location);
              setTimeout(() => {
                let journey = [{
                  pid: window.localStorage.getItem("pid"),
                  start_point: this.location[0].start_point
                }];
                // if credits available open the door and start the journey
                if (this.jsonResults.success == true && this.jsonResults.creditStatus == true) {
                  this.jsonResults = null;
                  this.post('journey', journey);
                  setTimeout(() => {
                    if (this.jsonResults.success == true) {
                      swal({
                        position: 'center',
                        type: 'success',
                        title: 'Have a Safe Journey! ' + this.card,
                        showConfirmButton: false,
                        timer: 2000
                      })
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
                else {  ///passenger don't have enough credits to travel
                  swal({
                    title: "Oops! You don't have enough credits to travel!",
                    type: 'error',
                    showConfirmButton: false,
                    timer: 1500
                  });
                }
              }, 1000);
            }
            else {
              this.jsonResults = null;
              // check if the passenger in the bus or not. if passenger is in the bus, 
              this.get('journey/' + window.localStorage.getItem("pid"));
              setTimeout(() => {
                
                if (this.jsonResults.start_point != null) {
                  window.localStorage.setItem("startPoint", this.jsonResults.start_point);
                  window.localStorage.setItem("journeyId", this.jsonResults.jid);
                  this.journey = [{
                    start_point: window.localStorage.getItem("startPoint"),
                    end_point: "Petah",
                    route_no: window.localStorage.getItem("routeNo")
                  }];
                  this.jsonResults = null;
                  //set end point to database and calculate fare of the journey
                  this.post('getFare', this.journey);
                  setTimeout(() => {
                    
                    if (this.jsonResults != null || this.jsonResults != undefined) {
                      let payment = [{
                        payment_type: "Card",
                        amount: this.jsonResults.amount,
                        jid: window.localStorage.getItem("journeyId")
                      }];

                      //deduct calculated fine from passenger's account
                      this.put('account/deductCredit/', window.localStorage.getItem("accountNumber"), payment)
                      setTimeout(() => {
                        
                        //sign out passenger from the bus journey
                        this.put('journey/', window.localStorage.getItem("pid"), this.journey);
                        if(this.jsonResults != null || this.jsonResults != undefined){
                          swal({
                            position: 'center',
                            type: 'success',
                            title: 'Thanks for travel with us! ' + this.card,
                            showConfirmButton: false,
                            timer: 2000
                          })
                        }
                      }, 600);
                    }
                  }, 600);
                }
              }, 600);
            }
          }, 600);
        }
      }, 600);
    }
  }
}
