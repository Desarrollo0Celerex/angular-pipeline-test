import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalSelectReportFormatModule } from '@components/modal-select-report-format/modal-select-report-format.module'
import { PaymentService } from '@services/payment.service';

import { CardReportContactPendingReceiptsComponent } from './card-report-contact-pending-receipts.component';

@NgModule({
  declarations: [
    CardReportContactPendingReceiptsComponent
  ],
  exports: [
    CardReportContactPendingReceiptsComponent
  ],
  imports: [
    CommonModule,
    ModalSelectReportFormatModule
  ],
  providers: [
    PaymentService
  ]
})
export class CardReportContactPendingReceiptsModule { }
