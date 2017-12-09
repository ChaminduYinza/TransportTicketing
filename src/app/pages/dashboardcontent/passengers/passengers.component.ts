import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Injectable } from '@angular/core';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-passengers',
  templateUrl: './passengers.component.html',
  styleUrls: ['./passengers.component.scss']
})
export class PassengersComponent implements OnInit {

  private baseUrl = "http://localhost:4000/api";
  daa: any;

  constructor(private http: Http) {
  }

  ngOnInit() {
    this.getUser();
  }
  getUser() {
    this.http.get(this.baseUrl + "/user").subscribe(data => {
      // Read the result field from the JSON response.
      this.daa = data.json();
    });
  }
  tableToExcel(data, filename) {
    
        // var  filterData;
        for (var i = 0; i < data.length; i++) {
          delete data[i].password;
          delete data[i].address;
          delete data[i]._id;
          delete data[i].__v;
    
        }
        var options = {
          fieldSeparator: ',',
          quoteStrings: '"',
          decimalseparator: '.',
          showLabels: true,
          showTitle: true,
          headers: ['Date of birth', 'Name', 'ID', 'Email', 'Phone no']
        };
    
        new Angular2Csv(data, filename, options);
    
      }

      
}
