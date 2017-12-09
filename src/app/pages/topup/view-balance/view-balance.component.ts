import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-balance',
  templateUrl: './view-balance.component.html',
  styleUrls: ['./view-balance.component.scss']
})
export class ViewBalanceComponent implements OnInit {

  constructor(private router : Router) { 
    
  }

  ngOnInit() {
  }

  accBalance = window.localStorage.getItem("balance");

  back(){
    this.router.navigate(['/selectTransaction']);
    window.localStorage.setItem("continue",null);
  }

}
