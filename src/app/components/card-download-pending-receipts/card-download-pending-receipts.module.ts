import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentService } from '@services/payment.service';

import { CardDownloadPendingReceiptsComponent } from './card-download-pending-receipts.component';

@NgModule({
  declarations: [
    CardDownloadPendingReceiptsComponent
  ],
  exports: [
      CardDownloadPendingReceiptsComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
      PaymentService
  ]
})
export class CardDownloadPendingReceiptsModule { }
