import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { PaymentService } from '@services/payment.service';
import { ReceiptPaidService } from '@services/receipt-paid.service';

import { CardPartnerPaymentReportsComponent } from './card-partner-payment-reports.component';

@NgModule({
  declarations: [
    CardPartnerPaymentReportsComponent
  ],
  exports: [
      CardPartnerPaymentReportsComponent
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
export class CardPartnerPaymentReportsModule { }
