import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerChartsPartnerPaymentsAppliedComponent } from './container-charts-partner-payments-applied.component';

import { ChartInsurancesModule } from '@components/chart-insurances/chart-insurances.module';
import { ChartInsurersModule } from '@components/chart-insurers/chart-insurers.module';
import { ChartContactTypesModule } from '@components/chart-contact-types/chart-contact-types.module';
import { ModalFilterResultsModule } from '@components/modal-filter-results/modal-filter-results.module';
import { ReceipPaidService } from '@core/services/receip-paid/receip-paid.service';

@NgModule({
    declarations: [ContainerChartsPartnerPaymentsAppliedComponent],
    exports: [ContainerChartsPartnerPaymentsAppliedComponent],
    imports: [
        CommonModule,
        ChartInsurancesModule,
        ChartInsurersModule,
        ChartContactTypesModule,
        ModalFilterResultsModule,
    ],
    providers: [ReceipPaidService],
})
export class ContainerChartsPartnerPaymentsAppliedModule {}
