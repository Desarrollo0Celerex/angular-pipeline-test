import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@shared/shared.module';

import { PayTracketRoutingModule } from './pay-tracker-routing.module';
import { PaymentsPage } from './pages/payments/payments.page';
import { PaymentsKpisContainer } from './containers/payments-kpis/payments-kpis.container';
import { PayTrackerService } from './services/pay-tracker/pay-tracker.service';
import { PaymentReminderService } from './services/payment-reminder/payment-reminder.service';
import { PaymentListComponent } from './components/payment-list/payment-list.component';
import { WorkspacePaymentListContainer } from './containers/workspace-payment-list/workspace-payment-list.container';
import { SearchResultsPage } from './pages/search-results/search-results.page';
import { SearchEngineContainer } from './containers/search-engine/search-engine.container';
import { PaymentsSearchEngineContainer } from './containers/payments-search-engine/payments-search-engine.container';
import { SearchPaymentListContainer } from './containers/search-payment-list/search-payment-list.container';
import { PaymentsTitleContainer } from './containers/payments-title/payments-title.container';
import { PaymentsMainActionContainer } from './containers/payments-main-action/payments-main-action.container';
import { ModalSelectPaymentsActionsComponent } from './components/modal-select-payments-actions/modal-select-payments-actions.component';
import { ModalSelectPaymentsReportTypeComponent } from './components/modal-select-payments-report-type/modal-select-payments-report-type.component';
import { ModalSearchPolicyContainer } from './containers/modal-search-policy/modal-search-policy.container';
import { ModalHandlePaymentComponent } from './components/modal-handle-payment/modal-handle-payment.component';
import { ModalSelectChannelsToSendReminderComponent } from './components/modal-select-channels-to-send-reminder/modal-select-channels-to-send-reminder.component';
import { ModalRequestReminderDataComponent } from './components/modal-request-reminder-data/modal-request-reminder-data.component';

import { ModalSelectContactActionModule } from '@components/modal-select-contact-action/modal-select-contact-action.module';
import { ModalSelectContactTypeModule } from '@components/modal-select-contact-type/modal-select-contact-type.module';
import { ModalSearchContactModule } from '@components/modal-search-contact/modal-search-contact.module';
import { ModalConfirmShowPolicyReceiptsPaidModule } from '@components/modal-confirm-show-policy-receipts-paid/modal-confirm-show-policy-receipts-paid.module';
import { ModalConfirmShowPendingPaymentsModule } from '@components/modal-confirm-show-pending-payments/modal-confirm-show-pending-payments.module';
import { ModalShowPolicyDetailsModule } from '@components/modal-show-policy-details/modal-show-policy-details.module';
import { ModalShowPolicyFileModule } from '@components/modal-show-policy-file/modal-show-policy-file.module';
import { ModalSelectCancellationTypeModule } from '@components/modal-select-cancellation-type/modal-select-cancellation-type.module';
import { ModalShowPaymentDetailsModule } from '@components/modal-show-payment-details/modal-show-payment-details.module';
import { ModalShowEndorsementModule } from '@components/modal-show-endorsement/modal-show-endorsement.module';
import { ModalSelectPaymentRegistrationTypeModule } from '@components/modal-select-payment-registration-type/modal-select-payment-registration-type.module';
import { ModalApplyPaymentModule } from '@components/modal-apply-payment/modal-apply-payment.module';
import { DropdownSelectPhoneCodeModule } from '@components/dropdown-select-phone-code/dropdown-select-phone-code.module';

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
        PaymentsMainActionContainer,
        ModalSelectPaymentsActionsComponent,
        ModalSelectPaymentsReportTypeComponent,
        ModalSearchPolicyContainer,
        ModalHandlePaymentComponent,
        ModalSelectChannelsToSendReminderComponent,
        ModalRequestReminderDataComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        PayTracketRoutingModule,
        ReactiveFormsModule,
        SharedModule,
        // REFACTORIZED
        ModalSelectContactActionModule,
        ModalSelectContactTypeModule,
        ModalSearchContactModule,
        ModalConfirmShowPolicyReceiptsPaidModule,
        ModalConfirmShowPendingPaymentsModule,
        ModalShowPolicyDetailsModule,
        ModalShowPolicyFileModule,
        ModalSelectCancellationTypeModule,
        ModalShowPaymentDetailsModule,
        ModalShowEndorsementModule,
        ModalSelectPaymentRegistrationTypeModule,
        ModalApplyPaymentModule,
        DropdownSelectPhoneCodeModule,
    ],
    providers: [PayTrackerService, PaymentReminderService],
})
export class PayTracketModule {}
