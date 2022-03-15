import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { ReceiptPaidService } from '@services/receipt-paid.service';

import { ChartReceiptsPaidComponent } from './chart-receipts-paid.component';

@NgModule({
  declarations: [
    ChartReceiptsPaidComponent
  ],
  exports: [
      ChartReceiptsPaidComponent
  ],
  imports: [
    CommonModule,
    LoadingContentModule
  ],
  providers: [
      ReceiptPaidService
  ]
})
export class ChartReceiptsPaidModule { }
