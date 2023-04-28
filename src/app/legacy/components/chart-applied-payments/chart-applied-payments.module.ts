import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { ReceiptPaidService } from '@services/receipt-paid.service';
import { WorkspaceService } from '@services/workspace.service';

import { ChartAppliedPaymentsComponent } from './chart-applied-payments.component';

@NgModule({
  declarations: [
    ChartAppliedPaymentsComponent
  ],
  exports: [
      ChartAppliedPaymentsComponent
  ],
  imports: [
    CommonModule,
    LoadingContentModule
  ],
  providers: [
      ReceiptPaidService,
      WorkspaceService
  ]
})
export class ChartAppliedPaymentsModule { }
