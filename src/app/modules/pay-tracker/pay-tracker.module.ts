import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';

import { PayTracketRoutingModule } from './pay-tracker-routing.module';
import { PaymentListPage } from './pages/payment-list/payment-list.page';
import { PaymentsKpisContainer } from './containers/payments-kpis/payments-kpis.container';
import { PayTrackerService } from './services/pay-tracker/pay-tracker.service';

@NgModule({
    declarations: [PaymentListPage, PaymentsKpisContainer],
    imports: [CommonModule, PayTracketRoutingModule, SharedModule],
    providers: [PayTrackerService],
})
export class PayTracketModule {}
