import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { CardReportPartnerPaymentsPendingModule } from '@components/card-report-partner-payments-pending/card-report-partner-payments-pending.module';
import { CardReportPartnerPaymentsAppliedModule } from '@components/card-report-partner-payments-applied/card-report-partner-payments-applied.module';
import { ContainerChartsPartnerPaymentsAppliedModule } from '@components/container-charts-partner-payments-applied/container-charts-partner-payments-applied.module';
import { ContainerChartsPartnerPaymentsPendingModule } from '@components/container-charts-partner-payments-pending/container-charts-partner-payments-pending.module';
import { ContainerPartnerDetailsModule } from '@components/container-partner-details/container-partner-details.module';
import { ContainerSelectStatsPeriodModule } from '@components/container-select-stats-period/container-select-stats-period.module';
import { PayTracketModule } from '@features/pay-tracker/pay-tracker.module';
import { ModalSelectContactActionModule } from '@components/modal-select-contact-action/modal-select-contact-action.module';
import { ModalSelectContactTypeModule } from '@components/modal-select-contact-type/modal-select-contact-type.module';
import { ModalSearchContactModule } from '@components/modal-search-contact/modal-search-contact.module';

import { PartnersRoutingModule } from './partners-routing.module';
import { PaymentsPendingByRangePage } from './pages/payments-pending-by-range/payments-pending-by-range.page';
import { PaymentsPendingListComponent } from './components/payments-pending-list/payments-pending-list.component';
import { PaymentsAppliedByRangePage } from './pages/payments-applied-by-range/payments-applied-by-range.page';
import { PaymentsAppliedListComponent } from './components/payments-applied-list/payments-applied-list.component';

@NgModule({
    declarations: [
        PaymentsPendingListComponent,
        PaymentsPendingByRangePage,
        PaymentsAppliedByRangePage,
        PaymentsAppliedListComponent,
    ],
    imports: [
        CardReportPartnerPaymentsPendingModule,
        CardReportPartnerPaymentsAppliedModule,
        CommonModule,
        ContainerChartsPartnerPaymentsAppliedModule,
        ContainerChartsPartnerPaymentsPendingModule,
        ContainerPartnerDetailsModule,
        ContainerSelectStatsPeriodModule,
        ModalSelectContactActionModule,
        ModalSelectContactTypeModule,
        ModalSearchContactModule,
        PartnersRoutingModule,
        PayTracketModule,
        SharedModule,
    ],
})
export class PartnersModule {}
