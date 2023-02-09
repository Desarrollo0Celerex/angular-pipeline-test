import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardKpiPercentageModule } from '@components/card-kpi-percentage/card-kpi-percentage.module';
import { PaymentService } from '@services/payment.service';
import { ReceiptPaidService } from '@services/receipt-paid.service';

import { CardKpiWorkspaceReceiptsPaidComponent } from './card-kpi-workspace-receipts-paid.component';

@NgModule({
  declarations: [
    CardKpiWorkspaceReceiptsPaidComponent
  ],
  exports: [
    CardKpiWorkspaceReceiptsPaidComponent
  ],
  imports: [
    CardKpiPercentageModule,
    CommonModule
  ],
  providers: [
    PaymentService,
    ReceiptPaidService
  ]
})
export class CardKpiWorkspaceReceiptsPaidModule { }
