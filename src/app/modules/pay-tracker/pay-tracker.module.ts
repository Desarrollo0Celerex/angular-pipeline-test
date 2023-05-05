import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';

import { PayTracketRoutingModule } from './pay-tracker-routing.module';
import { PaymentsPage } from './pages/payments/payments.page';
import { PaymentsKpisContainer } from './containers/payments-kpis/payments-kpis.container';
import { PayTrackerService } from './services/pay-tracker/pay-tracker.service';
import { PaymentListComponent } from './components/payment-list/payment-list.component';
import { WorkspacePaymentListContainer } from './containers/workspace-payment-list/workspace-payment-list.container';
import { SearchResultsPage } from './pages/search-results/search-results.page';
import { SearchEngineContainer } from './containers/search-engine/search-engine.container';
import { PaymentsSearchEngineContainer } from './containers/payments-search-engine/payments-search-engine.container';
import { SearchPaymentListContainer } from './containers/search-payment-list/search-payment-list.container';
import { PaymentsTitleContainer } from './containers/payments-title/payments-title.container';

@NgModule({
    declarations: [
        PaymentListComponent,
        PaymentsPage,
        PaymentsKpisContainer,
        WorkspacePaymentListContainer,
        SearchResultsPage,
        SearchEngineContainer,
        PaymentsSearchEngineContainer,
        SearchPaymentListContainer,
        PaymentsTitleContainer,
    ],
    imports: [CommonModule, PayTracketRoutingModule, SharedModule],
    providers: [PayTrackerService],
})
export class PayTracketModule {}
