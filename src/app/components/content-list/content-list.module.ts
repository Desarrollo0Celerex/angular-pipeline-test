import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardClientModule } from '@components/card-client/card-client.module';
import { CardContactModule } from '@components/card-contact/card-contact.module';
import { CardLeadModule } from '@components/card-lead/card-lead.module';
import { CardPaymentModule } from '@components/card-payment/card-payment.module';
import { CardPolicyModule } from '@components/card-policy/card-policy.module';
import { CardPolicyRecordModule } from '@components/card-policy-record/card-policy-record.module';
import { CardQuotationModule } from '@components/card-quotation/card-quotation.module';

import { ContainerIncompletePoliciesModule } from '@components/container-incomplete-policies/container-incomplete-policies.module';
import { ContentResultsModule } from '@components/content-results/content-results.module';
import { ContentSuggestionsModule } from '@components/content-suggestions/content-suggestions.module';
import { ContentTotalResultsModule } from '@components/content-total-results/content-total-results.module';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';

import { ModalApplyPaymentModule } from '@components/modal-apply-payment/modal-apply-payment.module';
import { ModalConfirmAcceptQuotationModule } from '@components/modal-confirm-accept-quotation/modal-confirm-accept-quotation.module';
import { ModalConfirmCancelPolicyModule } from '@components/modal-confirm-cancel-policy/modal-confirm-cancel-policy.module';
import { ModalConfirmEndorsePolicyModule } from '@components/modal-confirm-endorse-policy/modal-confirm-endorse-policy.module';
import { ModalConfirmReissuePolicyModule } from '@components/modal-confirm-reissue-policy/modal-confirm-reissue-policy.module';
import { ModalConfirmRejectQuotationModule } from '@components/modal-confirm-reject-quotation/modal-confirm-reject-quotation.module';
import { ModalConfirmRenewPolicyModule } from '@components/modal-confirm-renew-policy/modal-confirm-renew-policy.module';
import { ModalConfirmShowHistoryPolicyModule } from '@components/modal-confirm-show-history-policy/modal-confirm-show-history-policy.module';
import { ModalConfirmUpdatePolicyModule } from '@components/modal-confirm-update-policy/modal-confirm-update-policy.module';
import { ModalSelectContactModule } from '@components/modal-select-contact/modal-select-contact.module';
import { ModalSelectContactTypeModule } from '@components/modal-select-contact-type/modal-select-contact-type.module';
import { ModalShowContactDataModule } from '@components/modal-show-contact-data/modal-show-contact-data.module';
import { ModalShowEndorsementModule } from '@components/modal-show-endorsement/modal-show-endorsement.module';
import { ModalShowPolicyModule } from '@components/modal-show-policy/modal-show-policy.module';
import { ModalShowPolicyDetailsModule } from '@components/modal-show-policy-details/modal-show-policy-details.module';
import { ModalShowQuotationDetailsModule } from '@components/modal-show-quotation-details/modal-show-quotation-details.module';

import { PluralNameFormatModule } from '@pipes/plural-name-format/plural-name-format.module';

import { ClientService } from '@services/client.service';
import { ContactService } from '@services/contact.service';
import { LeadService } from '@services/lead.service';
import { PaymentService } from '@services/payment.service';
import { PolicyService } from '@services/policy.service';
import { QuotationService } from '@services/quotation.service';

import { ContentListComponent } from './content-list.component';
import { ContentListService } from './content-list.service';

@NgModule({
  declarations: [ContentListComponent],
  exports: [ContentListComponent],
  imports: [
    CardClientModule,
    CardContactModule,
    CardLeadModule,
    CardPaymentModule,
    CardPolicyModule,
    CardPolicyRecordModule,
    CardQuotationModule,
    CommonModule,
    ContainerIncompletePoliciesModule,
    ContentResultsModule,
    ContentSuggestionsModule,
    ContentTotalResultsModule,
    LoadingContentModule,
    PluralNameFormatModule,
    ModalApplyPaymentModule,
    ModalConfirmAcceptQuotationModule,
    ModalConfirmCancelPolicyModule,
    ModalConfirmEndorsePolicyModule,
    ModalConfirmReissuePolicyModule,
    ModalConfirmRejectQuotationModule,
    ModalConfirmRenewPolicyModule,
    ModalConfirmShowHistoryPolicyModule,
    ModalConfirmUpdatePolicyModule,
    ModalSelectContactModule,
    ModalSelectContactTypeModule,
    ModalShowContactDataModule,
    ModalShowEndorsementModule,
    ModalShowPolicyModule,
    ModalShowPolicyDetailsModule,
    ModalShowQuotationDetailsModule
  ],
  providers: [ClientService, ContactService, ContentListService, LeadService, PaymentService, PolicyService, QuotationService]
})
export class ContentListModule { }
