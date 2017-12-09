import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Injectable } from '@angular/core';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  private baseUrl = "http://localhost:4000/api";
  data: any;
  user: any;
  restData: any;
  daa: any; 
  paymentTypeChart = [{CARD:'0',CASH:'0'}];
  dataSetPichart: any;
  dataSetLinechart: any;
  card = 0;
  cash = 0;
  paymentTypeJSON = {};

  // Pie
  public pieChartLabels: string[] = ['Cash', 'Card'];
  public pieChartData: number[] = [0, 0];
  public pieChartType: string = 'pie';



  global = this;
  constructor(private http: Http) {
  }

  ngOnInit() {
    this.getUser();
    this.getApiPaymentData();
  }

  getUser() {
    this.http.get(this.baseUrl + "/user").subscribe(data => {
      // Read the result field from the JSON response.
      this.daa = data.json();
    });
  }
  getUsersByCityWiseCount() {
    this.http.get(this.baseUrl + "/user").subscribe(data => {
      // Read the result field from the JSON response.
      this.dataSetPichart = data.json();
    });
    //db.names.aggergate(($group(_id:"$city",$userId:($sum:1))))
  }

  getRouteWiseIncome() {
    this.http.get(this.baseUrl + "/route").subscribe(data => {
      // Read the result field from the JSON response.
      this.dataSetLinechart = data.json();
    });
  }

  getApiPaymentData() {

    var today = new Date();
    this.http.get(this.baseUrl + "/payment").subscribe(data => {

      this.dataSetLinechart = data.json();
      if (this.dataSetLinechart == null || this.dataSetLinechart == undefined) {
        this.card = 1;
        this.cash = 1;
      }
      else {
        
        for (var i = 0; i < this.dataSetLinechart.length; i++) {

          var travelDate = new Date(this.dataSetLinechart[i].date);

          if (travelDate.getMonth() == today.getMonth() &&
            travelDate.getFullYear() == today.getFullYear()) {
            if (this.dataSetLinechart[i].payment_type == 'Card') {


              this.card += parseInt(this.dataSetLinechart[i].amount);
            } else {
              this.cash += parseInt(this.dataSetLinechart[i].amount);
            }

          }
        }

      }
      this.paymentTypeChart = [{
        CARD: this.card.toString(),
        CASH: this.cash.toString()
      }]
      let a = parseInt(this.paymentTypeChart[0].CASH);
      let b = parseInt(this.paymentTypeChart[0].CARD);
      this.pieChartData = [a, b];

    });
  }


  // lineChart
  public lineChartData: Array<any> = [

    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
    { data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C' }
  ];
  public lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';

  // Pie




  // barchart
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;

  public barChartData: any[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];

}
