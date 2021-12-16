import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardKpiOneModule } from '@components/card-kpi-one/card-kpi-one.module';
import { PaymentService } from '@services/payment.service';

import { ContainerPaymentsKpisComponent } from './container-payments-kpis.component';

@NgModule({
  declarations: [
    ContainerPaymentsKpisComponent
  ],
  exports: [
      ContainerPaymentsKpisComponent
  ],
  imports: [
    CardKpiOneModule,
    CommonModule
  ],
  providers: [
      PaymentService
  ]
})
export class ContainerPaymentsKpisModule { }
