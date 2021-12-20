import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentService } from '@services/payment.service';

import { CardKpiTotalPendingPaymentsComponent } from './card-kpi-total-pending-payments.component';

@NgModule({
  declarations: [
    CardKpiTotalPendingPaymentsComponent
  ],
  exports: [
      CardKpiTotalPendingPaymentsComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
      PaymentService
  ]
})
export class CardKpiTotalPendingPaymentsModule { }
