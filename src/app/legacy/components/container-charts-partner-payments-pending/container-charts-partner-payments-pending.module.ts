import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerChartsPartnerPaymentsPendingComponent } from './container-charts-partner-payments-pending.component';

import { ChartInsurancesModule } from '@components/chart-insurances/chart-insurances.module';
import { ChartInsurersModule } from '@components/chart-insurers/chart-insurers.module';
import { ChartContactTypesModule } from '@components/chart-contact-types/chart-contact-types.module';
import { ModalFilterResultsModule } from '@components/modal-filter-results/modal-filter-results.module';
import { PaymentService } from '@core/services/payment/payment.service';

@NgModule({
  declarations: [
    ContainerChartsPartnerPaymentsPendingComponent
  ],
  exports: [ContainerChartsPartnerPaymentsPendingComponent],
  imports: [
    CommonModule,
    ChartInsurancesModule,
    ChartInsurersModule,
    ChartContactTypesModule,
    ModalFilterResultsModule
  ],
  providers: [PaymentService]
})
export class ContainerChartsPartnerPaymentsPendingModule { }
