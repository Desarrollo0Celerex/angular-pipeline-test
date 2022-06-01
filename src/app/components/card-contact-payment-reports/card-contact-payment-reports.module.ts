import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { ModalSelectReportFormatModule } from '@components/modal-select-report-format/modal-select-report-format.module'
import { PaymentService } from '@services/payment.service';
import { ReceiptPaidService } from '@services/receipt-paid.service';

import { CardContactPaymentReportsComponent } from './card-contact-payment-reports.component';

@NgModule({
  declarations: [
    CardContactPaymentReportsComponent
  ],
  exports: [
      CardContactPaymentReportsComponent
  ],
  imports: [
    CommonModule,
    LoadingContentModule,
    ModalSelectReportFormatModule
  ],
  providers: [
      PaymentService,
      ReceiptPaidService
  ]
})
export class CardContactPaymentReportsModule { }
