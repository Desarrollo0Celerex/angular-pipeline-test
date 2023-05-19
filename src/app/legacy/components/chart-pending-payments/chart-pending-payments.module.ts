import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { PaymentService } from '@services/payment.service';

import { ChartPendingPaymentsComponent } from './chart-pending-payments.component';

@NgModule({
  declarations: [
    ChartPendingPaymentsComponent
  ],
  exports: [
      ChartPendingPaymentsComponent
  ],
  imports: [
    CommonModule,
    LoadingContentModule
  ],
  providers: [
      PaymentService
  ]
})
export class ChartPendingPaymentsModule { }
