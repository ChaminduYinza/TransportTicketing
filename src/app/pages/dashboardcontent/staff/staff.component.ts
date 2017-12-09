import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {

  private baseUrl="http://192.168.1.100:4000/api";
  data:any;
  user:any;
  restData:any;
  dataSet:any;
  dataSetPichart:any;
  dataSetLinechart:any;
  

  constructor(private http: Http) { }

  ngOnInit() {

  }

  getStaff() {
    this.http.get('staff/').subscribe(data => {
      // Read the result field from the JSON response.
      this.dataSet=data.json();
    });
    
    
  }





































































  

  userDataJson=
  
  [
      {
        "_id": "5a17cee074dac938159a18dc",
        "password": "newPassword",
        "dob": "1994-12-29T00:00:00.000Z",
        "name": "Chamindu Thiranjaya",
        "email": "chnamindu@my.com",
        "role":"Admin",
        "PID": "P1",
        "__v": 0,
        "phoneNo": [
          112603324
        ],
        "address": [
          {
            "no": 1,
            "street": "Colombo",
            "city": "Piliyandala",
            "_id": "5a17cee074dac938159a18dd"
          }
        ]
      },
      {
        "_id": "5a17cf760d4730c4169f88bb",
        "password": "newPassword",
        "dob": "1994-12-29T00:00:00.000Z",
        "name": "Chamindu Thiranjaya",
        "email": "chnamindu@my.com",
        "role":"Admin",
        "PID": "P2",
        "__v": 0,
        "phoneNo": [
          112603324
        ],
        "address": [
          {
            "no": 1,
            "street": "Colombo",
            "city": "Piliyandala",
            "_id": "5a17cf760d4730c4169f88bc"
          }
        ]
      },
      {
        "_id": "5a17cf8edabce4f415e4ccaa",
        "password": "newPassword",
        "dob": "1994-12-29T00:00:00.000Z",
        "name": "Chamindu Thiranjaya",
        "email": "chnamindu@my.com",
        "role":"Admin",
        "PID": "P3",
        "__v": 0,
        "phoneNo": [
          112603324
        ],
        "address": [
          {
            "no": 1,
            "street": "Colombo",
            "city": "Piliyandala",
            "_id": "5a17cf8edabce4f415e4ccab"
          }
        ]
      },
      {
        "_id": "5a17cfbcd346ab88085205cb",
        "password": "newPassword",
        "dob": "1994-12-29T00:00:00.000Z",
        "name": "Chamindu Thiranjaya",
        "email": "chnamindu@my.com",
        "role":"Front Desk",
        "PID": "P4",
        "__v": 0,
        "phoneNo": [
          112603324
        ],
        "address": [
          {
            "no": 1,
            "street": "Colombo",
            "city": "Piliyandala",
            "_id": "5a17cfbcd346ab88085205cc"
          }
        ]
      },
      {
        "_id": "5a17cfe3ed4b50a413fc621c",
        "password": "newPassword",
        "dob": "1994-12-29T00:00:00.000Z",
        "name": "Chamindu Thiranjaya",
        "email": "chnamindu@my.com",
        "role":"Credit Manager",
        "PID": "P5",
        "__v": 0,
        "phoneNo": [
          112603324
        ],
        "address": [
          {
            "no": 1,
            "street": "Colombo",
            "city": "Piliyandala",
            "_id": "5a17cfe3ed4b50a413fc621d"
          }
        ]
      },
      {
        "_id": "5a17d025c005bac80e715100",
        "password": "newPassword",
        "dob": "1994-12-29T00:00:00.000Z",
        "name": "Chamindu Thiranjaya",
        "email": "chnamindu@my.com",
        "role":"Credit Manager",
        "PID": "P6",
        "__v": 0,
        "phoneNo": [
          112603324
        ],
        "address": [
          {
            "no": 1,
            "street": "Colombo",
            "city": "Piliyandala",
            "_id": "5a17d025c005bac80e715101"
          }
        ]
      },
      {
        "_id": "5a17d07d9e88fea41325b21e",
        "password": "newPassword",
        "dob": "1994-12-29T00:00:00.000Z",
        "name": "Chamindu Thiranjaya",
        "email": "chnamindu@my.com",
        "role":"HR Manager",
        "PID": "P7",
        "__v": 0,
        "phoneNo": [
          112603324
        ],
        "address": [
          {
            "no": 1,
            "street": "Colombo",
            "city": "Piliyandala",
            "_id": "5a17d07d9e88fea41325b21f"
          }
        ]
      },
      {
        "_id": "5a17d0b15d43ce90067063fc",
        "password": "newPassword",
        "dob": "1994-12-29T00:00:00.000Z",
        "name": "Chamindu Thiranjaya",
        "email": "chnamindu@my.com",
        "role":"Marketing Executive",
        "PID": "P8",
        "__v": 0,
        "phoneNo": [
          112603324
        ],
        "address": [
          {
            "no": 1,
            "street": "Colombo",
            "city": "Piliyandala",
            "_id": "5a17d0b15d43ce90067063fd"
          }
        ]
      },
      {
        "_id": "5a17d0cbc30e5fa413f250e0",
        "password": "newPassword",
        "dob": "1994-12-29T00:00:00.000Z",
        "name": "Chamindu Thiranjaya",
        "email": "chnamindu@my.com",
        "role":"Admin",
        "PID": "P9",
        "__v": 0,
        "phoneNo": [
          112603324
        ],
        "address": [
          {
            "no": 1,
            "street": "Colombo",
            "city": "Piliyandala",
            "_id": "5a17d0cbc30e5fa413f250e1"
          }
        ]
      },
      {
        "_id": "5a17d0dae637e65c12d9f7cf",
        "password": "newPassword",
        "dob": "1994-12-29T00:00:00.000Z",
        "name": "Chamindu Thiranjaya",
        "email": "chnamindu@my.com",
        "PID": "P10",
        "role":"Support",
        "__v": 0,
        "phoneNo": [
          112603324
        ],
        "address": [
          {
            "no": 1,
            "street": "Colombo",
            "city": "Piliyandala",
            "_id": "5a17d0dae637e65c12d9f7d0"
          }
        ]
      },
      {
        "_id": "5a17d1add09714a807ac26ae",
        "password": "newPassword",
        "dob": "1994-12-29T00:00:00.000Z",
        "name": "Chamindu Thiranjaya",
        "email": "chnamindu@my.com",
        "role":"Support",
        "PID": "P13",
        "__v": 0,
        "phoneNo": [
          112603324
        ],
        "address": [
          {
            "no": 1,
            "street": "Colombo",
            "city": "Piliyandala",
            "_id": "5a17d1add09714a807ac26af"
          }
        ]
      }
    ];
}
