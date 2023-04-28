import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { PaymentService } from '@services/payment.service';
import { ReceiptPaidService } from '@services/receipt-paid.service';

import { ChartTicketPaymentProcessComponent } from './chart-ticket-payment-process.component';

@NgModule({
  declarations: [
    ChartTicketPaymentProcessComponent
  ],
  exports: [
      ChartTicketPaymentProcessComponent
  ],
  imports: [
    CommonModule,
    LoadingContentModule
  ],
  providers: [
      PaymentService,
      ReceiptPaidService
  ]
})
export class ChartTicketPaymentProcessModule { }
