import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.component.html',
  styleUrls: ['./payment-methods.component.scss']
})
export class PaymentMethodsComponent implements OnInit {

  constructor(private router : Router) { 
    
  }

  ngOnInit() {

  }
  card(){
    this.router.navigate(['/creditbyCard']);
  }
  cash(){
    this.router.navigate(['/creditbyCash']);
  }
  back(){
    this.router.navigate(['/selectTransaction']);
    window.localStorage.setItem("continue",null);
  }


}
