import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from "clarity-angular";
import { HttpModule } from '@angular/http'
import { ChartsModule } from 'ng2-charts';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { SwapcardComponent } from './pages/swapcard/swapcard.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TopupComponent } from './pages/topup/topup.component';
import { NavigationComponent } from './shared/navigation/navigation.component';

import { SelectTransactionComponent } from './pages/topup/select-transaction/select-transaction.component';
import { PaymentMethodsComponent } from './pages/topup/payment-methods/payment-methods.component';
import { AddCreditByCardComponent } from './pages/topup/add-credit-by-card/add-credit-by-card.component';
import { AddCreditByCashComponent } from './pages/topup/add-credit-by-cash/add-credit-by-cash.component';
import { PassengersComponent } from './pages/dashboardcontent/passengers/passengers.component';
import { StaffComponent } from './pages/dashboardcontent/staff/staff.component';
import { BussesComponent } from './pages/dashboardcontent/busses/busses.component';
import { StatisticsComponent } from './pages/dashboardcontent/statistics/statistics.component';
import { ViewBalanceComponent } from './pages/topup/view-balance/view-balance.component';

const appRoutes: Routes = [
  { path: 'swapcard', component: SwapcardComponent },
  { path: 'topup', component: TopupComponent },
  { path: 'dashboard', component: DashboardComponent,
  children: [
    {path:'passenger', component:PassengersComponent},
    {path:'staff', component:StaffComponent},
    {path:'busses', component:BussesComponent},
    {path:'staticstics', component:StatisticsComponent}
  ]
  },
  { path: 'selectTransaction', component: SelectTransactionComponent },
  { path: 'paymentMethod', component: PaymentMethodsComponent },
  { path: 'creditbyCard', component: AddCreditByCardComponent },
  { path: 'creditbyCash', component: AddCreditByCashComponent },
  { path: 'accBalance', component: ViewBalanceComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SwapcardComponent,
    DashboardComponent,
    TopupComponent,
    NavigationComponent,
    SelectTransactionComponent,
    PaymentMethodsComponent,
    AddCreditByCardComponent,
    AddCreditByCashComponent,
    PassengersComponent,
    StaffComponent,
    BussesComponent,
    StatisticsComponent,
    ViewBalanceComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ChartsModule,
    RouterModule.forRoot(
      appRoutes,
      { useHash: true }
    ),
    ClarityModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
