import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalSelectReportFormatModule } from '@components/modal-select-report-format/modal-select-report-format.module'
import { PaymentService } from '@services/payment.service';

import { CardReportPendingReceiptsComponent } from './card-report-pending-receipts.component';

@NgModule({
  declarations: [
    CardReportPendingReceiptsComponent
  ],
  exports: [
      CardReportPendingReceiptsComponent
  ],
  imports: [
    CommonModule,
    ModalSelectReportFormatModule
  ],
  providers: [
      PaymentService
  ]
})
export class CardReportPendingReceiptsModule { }
