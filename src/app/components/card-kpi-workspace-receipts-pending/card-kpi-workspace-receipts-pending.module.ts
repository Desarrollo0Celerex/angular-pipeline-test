import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardKpiRangeModule } from '@components/card-kpi-range/card-kpi-range.module';
import { PaymentService } from '@services/payment.service';

import { CardKpiWorkspaceReceiptsPendingComponent } from './card-kpi-workspace-receipts-pending.component';
import { CardKpiWorkspaceReceiptsPendingService } from './card-kpi-workspace-receipts-pending.service';

@NgModule({
  declarations: [
    CardKpiWorkspaceReceiptsPendingComponent
  ],
  exports: [
    CardKpiWorkspaceReceiptsPendingComponent
  ],
  imports: [
    CardKpiRangeModule,
    CommonModule
  ],
  providers: [
    CardKpiWorkspaceReceiptsPendingService,
    PaymentService
  ]
})
export class CardKpiWorkspaceReceiptsPendingModule { }
