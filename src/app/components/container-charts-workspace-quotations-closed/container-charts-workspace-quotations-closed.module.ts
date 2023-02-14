import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartInsurancesModule } from '@components/chart-insurances/chart-insurances.module';
import { ChartInsurersModule } from '@components/chart-insurers/chart-insurers.module';
import { ChartContactTypesModule } from '@components/chart-contact-types/chart-contact-types.module';
import { ModalFilterResultsModule } from '@components/modal-filter-results/modal-filter-results.module';
import { QuotationService } from '@services/quotation.service';

import { ContainerChartsWorkspaceQuotationsClosedComponent } from './container-charts-workspace-quotations-closed.component';

@NgModule({
  declarations: [
    ContainerChartsWorkspaceQuotationsClosedComponent
  ],
  exports: [
    ContainerChartsWorkspaceQuotationsClosedComponent
  ],
  imports: [
    ChartInsurancesModule,
    ChartInsurersModule,
    ChartContactTypesModule,
    CommonModule,
    ModalFilterResultsModule
  ],
  providers: [
    QuotationService
  ]
})
export class ContainerChartsWorkspaceQuotationsClosedModule { }
