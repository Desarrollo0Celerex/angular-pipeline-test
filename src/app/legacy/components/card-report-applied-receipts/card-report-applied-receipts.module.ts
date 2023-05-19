import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalSelectReportFormatModule } from '@components/modal-select-report-format/modal-select-report-format.module'
import { ReceiptPaidService } from '@services/receipt-paid.service';

import { CardReportAppliedReceiptsComponent } from './card-report-applied-receipts.component';

@NgModule({
  declarations: [
    CardReportAppliedReceiptsComponent
  ],
  exports: [
      CardReportAppliedReceiptsComponent
  ],
  imports: [
    CommonModule,
    ModalSelectReportFormatModule
  ],
  providers: [
      ReceiptPaidService
  ]
})
export class CardReportAppliedReceiptsModule { }
