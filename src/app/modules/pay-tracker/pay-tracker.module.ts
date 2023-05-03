import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';

import { PayTracketRoutingModule } from './pay-tracker-routing.module';
import { PaymentsPage } from './pages/payments/payments.page';
import { PaymentsKpisContainer } from './containers/payments-kpis/payments-kpis.container';
import { PayTrackerService } from './services/pay-tracker/pay-tracker.service';
import { PaymentListContainer } from './containers/payment-list/payment-list.container';

@NgModule({
    declarations: [PaymentsPage, PaymentsKpisContainer, PaymentListContainer],
    imports: [CommonModule, PayTracketRoutingModule, SharedModule],
    providers: [PayTrackerService],
})
export class PayTracketModule {}
