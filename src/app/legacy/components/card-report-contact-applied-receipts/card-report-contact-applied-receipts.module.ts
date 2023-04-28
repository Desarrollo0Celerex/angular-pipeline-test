import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalSelectReportFormatModule } from '@components/modal-select-report-format/modal-select-report-format.module'
import { ReceiptPaidService } from '@services/receipt-paid.service';

import { CardReportContactAppliedReceiptsComponent } from './card-report-contact-applied-receipts.component';

@NgModule({
  declarations: [
    CardReportContactAppliedReceiptsComponent
  ],
  exports: [
    CardReportContactAppliedReceiptsComponent
  ],
  imports: [
    CommonModule,
    ModalSelectReportFormatModule
  ],
  providers: [
    ReceiptPaidService
  ]
})
export class CardReportContactAppliedReceiptsModule { }
