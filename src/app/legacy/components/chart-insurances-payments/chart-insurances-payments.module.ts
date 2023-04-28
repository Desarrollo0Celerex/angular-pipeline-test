import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { PaymentService } from '@services/payment.service';

import { ChartInsurancesPaymentsComponent } from './chart-insurances-payments.component';

@NgModule({
  declarations: [
    ChartInsurancesPaymentsComponent
  ],
  exports: [
      ChartInsurancesPaymentsComponent
  ],
  imports: [
    CommonModule,
    LoadingContentModule
  ],
  providers: [
      PaymentService
  ]
})
export class ChartInsurancesPaymentsModule { }
