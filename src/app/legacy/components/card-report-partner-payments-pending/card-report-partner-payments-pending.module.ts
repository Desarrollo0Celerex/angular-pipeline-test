import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardReportPartnerPaymentsPendingComponent } from './card-report-partner-payments-pending.component';

import { ModalSelectReportFormatModule } from '@components/modal-select-report-format/modal-select-report-format.module'
import { PaymentService } from '@services/payment.service';

@NgModule({
  declarations: [
    CardReportPartnerPaymentsPendingComponent
  ],
  exports: [
    CardReportPartnerPaymentsPendingComponent
  ],
  imports: [
    CommonModule,
    ModalSelectReportFormatModule
  ],
  providers: [
    PaymentService
  ]
})
export class CardReportPartnerPaymentsPendingModule { }
