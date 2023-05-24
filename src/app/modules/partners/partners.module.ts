import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { CardReportPartnerPaymentsPendingModule } from '@components/card-report-partner-payments-pending/card-report-partner-payments-pending.module';
import { ContainerChartsPartnerPaymentsPendingModule } from '@components/container-charts-partner-payments-pending/container-charts-partner-payments-pending.module';
import { ContainerSelectStatsPeriodModule } from '@components/container-select-stats-period/container-select-stats-period.module';
import { PayTracketModule } from '@modules/pay-tracker/pay-tracker.module'
import { ModalSelectContactActionModule } from '@components/modal-select-contact-action/modal-select-contact-action.module';
import { ModalSelectContactTypeModule } from '@components/modal-select-contact-type/modal-select-contact-type.module';
import { ModalSearchContactModule } from '@components/modal-search-contact/modal-search-contact.module';

import { PartnersRoutingModule } from './partners-routing.module';
import { PaymentsPendingByRangePage } from './pages/payments-pending-by-range/payments-pending-by-range.page';
import { PaymentsPendingListComponent } from './components/payments-pending-list/payments-pending-list.component'

@NgModule({
  declarations: [
    PaymentsPendingListComponent,
    PaymentsPendingByRangePage
  ],
  imports: [
    CardReportPartnerPaymentsPendingModule,
    CommonModule,
    ContainerChartsPartnerPaymentsPendingModule,
    ContainerSelectStatsPeriodModule,
    ModalSelectContactActionModule,
    ModalSelectContactTypeModule,
    ModalSearchContactModule,
    PartnersRoutingModule,
    PayTracketModule,
    SharedModule,
  ]
})
export class PartnersModule { }
