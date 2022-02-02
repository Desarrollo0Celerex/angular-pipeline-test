import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartInsurancesModule } from '@components/chart-insurances/chart-insurances.module';
import { ChartInsurersModule } from '@components/chart-insurers/chart-insurers.module';
import { ChartContactTypesModule } from '@components/chart-contact-types/chart-contact-types.module';
import { ModalFilterResultsModule } from '@components/modal-filter-results/modal-filter-results.module';
import { PaymentService } from '@services/payment.service';

import { ContainerChartsPendingPaymentsComponent } from './container-charts-pending-payments.component';

@NgModule({
  declarations: [
    ContainerChartsPendingPaymentsComponent
  ],
  exports: [
      ContainerChartsPendingPaymentsComponent
  ],
  imports: [
    CommonModule,
    ChartContactTypesModule,
    ChartInsurersModule,
    ChartInsurancesModule,
    ModalFilterResultsModule
  ],
  providers: [
      PaymentService
  ]
})
export class ContainerChartsPendingPaymentsModule { }
