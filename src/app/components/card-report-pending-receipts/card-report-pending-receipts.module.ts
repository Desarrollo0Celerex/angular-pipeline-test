import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
    CommonModule
  ],
  providers: [
      PaymentService
  ]
})
export class CardReportPendingReceiptsModule { }
