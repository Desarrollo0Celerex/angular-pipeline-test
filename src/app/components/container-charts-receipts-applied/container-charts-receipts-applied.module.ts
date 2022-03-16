import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartInsurancesModule } from '@components/chart-insurances/chart-insurances.module';
import { ChartInsurersModule } from '@components/chart-insurers/chart-insurers.module';
import { ChartContactTypesModule } from '@components/chart-contact-types/chart-contact-types.module';
import { ModalFilterResultsModule } from '@components/modal-filter-results/modal-filter-results.module';
import { ReceiptPaidService } from '@services/receipt-paid.service';

import { ContainerChartsReceiptsAppliedComponent } from './container-charts-receipts-applied.component';

@NgModule({
  declarations: [
    ContainerChartsReceiptsAppliedComponent
  ],
  exports: [
      ContainerChartsReceiptsAppliedComponent
  ],
  imports: [
    CommonModule,
    ChartContactTypesModule,
    ChartInsurersModule,
    ChartInsurancesModule,
    ModalFilterResultsModule
  ],
  providers: [
      ReceiptPaidService
  ]
})
export class ContainerChartsReceiptsAppliedModule { }
