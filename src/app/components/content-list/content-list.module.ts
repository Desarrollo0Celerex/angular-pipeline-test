import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardClientModule } from '@components/card-client/card-client.module';
import { CardContactModule } from '@components/card-contact/card-contact.module';
import { CardContactFileModule } from '@components/card-contact-file/card-contact-file.module';
import { CardGroupModule } from '@components/card-group/card-group.module';
import { CardGroupMemberModule } from '@components/card-group-member/card-group-member.module';
import { CardLeadModule } from '@components/card-lead/card-lead.module';
import { CardPartnerModule } from '@components/card-partner/card-partner.module';
import { CardPaymentModule } from '@components/card-payment/card-payment.module';
import { CardPendingReceiptModule } from '@components/card-pending-receipt/card-pending-receipt.module';
import { CardPolicyModule } from '@components/card-policy/card-policy.module';
import { CardPolicyRecordModule } from '@components/card-policy-record/card-policy-record.module';
import { CardPolicyTrackerModule } from '@components/card-policy-tracker/card-policy-tracker.module';
import { CardQuotationModule } from '@components/card-quotation/card-quotation.module';
import { CardReceiptPaidRecordModule } from '@components/card-receipt-paid-record/card-receipt-paid-record.module';
import { CardReportedSinisterModule } from '@components/card-reported-sinister/card-reported-sinister.module';
import { CardSinisterModule } from '@components/card-sinister/card-sinister.module';
import { CardSinisterLogModule } from '@components/card-sinister-log/card-sinister-log.module';

import { ContainerExternalPoliciesModule } from '@components/container-external-policies/container-external-policies.module';
import { ContainerIncompletePoliciesModule } from '@components/container-incomplete-policies/container-incomplete-policies.module';
import { ContentBackModule } from '@components/content-back/content-back.module';
import { ContentResultsModule } from '@components/content-results/content-results.module';
import { ContentSuggestionsModule } from '@components/content-suggestions/content-suggestions.module';
import { ContentTotalResultsModule } from '@components/content-total-results/content-total-results.module';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';

import { ModalApplyPaymentModule } from '@components/modal-apply-payment/modal-apply-payment.module';
import { ModalConfirmAcceptQuotationModule } from '@components/modal-confirm-accept-quotation/modal-confirm-accept-quotation.module';
import { ModalConfirmCancelPolicyModule } from '@components/modal-confirm-cancel-policy/modal-confirm-cancel-policy.module';
import { ModalConfirmDeleteContactFileModule } from '@components/modal-confirm-delete-contact-file/modal-confirm-delete-contact-file.module';
import { ModalConfirmDeletePolicyCompleteModule } from '@components/modal-confirm-delete-policy-complete/modal-confirm-delete-policy-complete.module';
import { ModalConfirmDeleteReceiptPaidModule } from '@components/modal-confirm-delete-receipt-paid/modal-confirm-delete-receipt-paid.module';
import { ModalConfirmDeleteRenewedPolicyModule } from '@components/modal-confirm-delete-renewed-policy/modal-confirm-delete-renewed-policy.module';
import { ModalConfirmDeleteSinisterEventModule } from '@components/modal-confirm-delete-sinister-event/modal-confirm-delete-sinister-event.module';
import { ModalConfirmEndorsePolicyModule } from '@components/modal-confirm-endorse-policy/modal-confirm-endorse-policy.module';
import { ModalConfirmFinalizeSinisterModule } from '@components/modal-confirm-finalize-sinister/modal-confirm-finalize-sinister.module';
import { ModalConfirmReactivateSinisterModule } from '@components/modal-confirm-reactivate-sinister/modal-confirm-reactivate-sinister.module';
import { ModalConfirmReissuePolicyModule } from '@components/modal-confirm-reissue-policy/modal-confirm-reissue-policy.module';
import { ModalConfirmRejectQuotationModule } from '@components/modal-confirm-reject-quotation/modal-confirm-reject-quotation.module';
import { ModalConfirmRenewPolicyModule } from '@components/modal-confirm-renew-policy/modal-confirm-renew-policy.module';
import { ModalConfirmShowHistoryPolicyModule } from '@components/modal-confirm-show-history-policy/modal-confirm-show-history-policy.module';
import { ModalConfirmShowPaymentHistoryModule } from '@components/modal-confirm-show-payment-history/modal-confirm-show-payment-history.module';
import { ModalConfirmShowPolicySinistersModule } from '@components/modal-confirm-show-policy-sinisters/modal-confirm-show-policy-sinisters.module';
import { ModalConfirmShowSinisterModule } from '@components/modal-confirm-show-sinister/modal-confirm-show-sinister.module';
import { ModalConfirmShowSinisterHistoryModule } from '@components/modal-confirm-show-sinister-history/modal-confirm-show-sinister-history.module';
import { ModalConfirmUpdateContactFileModule } from '@components/modal-confirm-update-contact-file/modal-confirm-update-contact-file.module';
import { ModalConfirmUpdatePolicyModule } from '@components/modal-confirm-update-policy/modal-confirm-update-policy.module';
import { ModalSelectContactModule } from '@components/modal-select-contact/modal-select-contact.module';
import { ModalSelectContactTypeModule } from '@components/modal-select-contact-type/modal-select-contact-type.module';
import { ModalShowCancellationEvidenceModule } from '@components/modal-show-cancellation-evidence/modal-show-cancellation-evidence.module';
import { ModalShowContactDataModule } from '@components/modal-show-contact-data/modal-show-contact-data.module';
import { ModalShowContactFileDetailsModule } from '@components/modal-show-contact-file-details/modal-show-contact-file-details.module';
import { ModalShowEndorsementModule } from '@components/modal-show-endorsement/modal-show-endorsement.module';
import { ModalShowPartnerDetailsModule } from '@components/modal-show-partner-details/modal-show-partner-details.module';
import { ModalShowPolicyModule } from '@components/modal-show-policy/modal-show-policy.module';
import { ModalShowPolicyDetailsModule } from '@components/modal-show-policy-details/modal-show-policy-details.module';
import { ModalShowQuotationDetailsModule } from '@components/modal-show-quotation-details/modal-show-quotation-details.module';
import { ModalShowReactivationEvidenceModule } from '@components/modal-show-reactivation-evidence/modal-show-reactivation-evidence.module';
import { ModalShowResolutionEvidenceModule } from '@components/modal-show-resolution-evidence/modal-show-resolution-evidence.module';
import { ModalShowSinisterDetailsModule } from '@components/modal-show-sinister-details/modal-show-sinister-details.module';
import { ModalTransferContactFileModule } from '@components/modal-transfer-contact-file/modal-transfer-contact-file.module';
import { ModalUpdateReceiptPaidModule } from '@components/modal-update-receipt-paid/modal-update-receipt-paid.module';
import { ModalUpdateSinisterEventModule } from '@components/modal-update-sinister-event/modal-update-sinister-event.module';

import { PluralNameFormatModule } from '@pipes/plural-name-format/plural-name-format.module';

import { ClientService } from '@services/client.service';
import { ContactService } from '@services/contact.service';
import { ContactFileService } from '@services/contact-file.service';
import { EndorsementService } from '@services/endorsement.service';
import { GroupService } from '@services/group.service';
import { GroupMemberService } from '@services/group-member.service';
import { LeadService } from '@services/lead.service';
import { PartnerService } from '@services/partner.service';
import { PaymentService } from '@services/payment.service';
import { PolicyService } from '@services/policy.service';
import { PolicyLogService } from '@services/policy-log.service';
import { QuotationService } from '@services/quotation.service';
import { ReceiptPaidService } from '@services/receipt-paid.service';
import { SinisterService } from '@services/sinister.service';

import { ContentListComponent } from './content-list.component';
import { ContentListService } from './content-list.service';

@NgModule({
  declarations: [ContentListComponent],
  exports: [ContentListComponent],
  imports: [
    CardClientModule,
    CardContactModule,
    CardContactFileModule,
    CardGroupModule,
    CardGroupMemberModule,
    CardLeadModule,
    CardPartnerModule,
    CardPaymentModule,
    CardPendingReceiptModule,
    CardPolicyModule,
    CardPolicyRecordModule,
    CardPolicyTrackerModule,
    CardQuotationModule,
    CardReceiptPaidRecordModule,
    CardReportedSinisterModule,
    CardSinisterModule,
    CardSinisterLogModule,
    CommonModule,
    ContainerExternalPoliciesModule,
    ContainerIncompletePoliciesModule,
    ContentBackModule,
    ContentResultsModule,
    ContentSuggestionsModule,
    ContentTotalResultsModule,
    LoadingContentModule,
    PluralNameFormatModule,
    ModalApplyPaymentModule,
    ModalConfirmAcceptQuotationModule,
    ModalConfirmCancelPolicyModule,
    ModalConfirmDeleteContactFileModule,
    ModalConfirmDeletePolicyCompleteModule,
    ModalConfirmDeleteReceiptPaidModule,
    ModalConfirmDeleteRenewedPolicyModule,
    ModalConfirmDeleteSinisterEventModule,
    ModalConfirmEndorsePolicyModule,
    ModalConfirmFinalizeSinisterModule,
    ModalConfirmReactivateSinisterModule,
    ModalConfirmReissuePolicyModule,
    ModalConfirmRejectQuotationModule,
    ModalConfirmRenewPolicyModule,
    ModalConfirmShowHistoryPolicyModule,
    ModalConfirmShowPaymentHistoryModule,
    ModalConfirmShowPolicySinistersModule,
    ModalConfirmShowSinisterModule,
    ModalConfirmShowSinisterHistoryModule,
    ModalConfirmUpdateContactFileModule,
    ModalConfirmUpdatePolicyModule,
    ModalSelectContactModule,
    ModalSelectContactTypeModule,
    ModalShowCancellationEvidenceModule,
    ModalShowContactDataModule,
    ModalShowContactFileDetailsModule,
    ModalShowEndorsementModule,
    ModalShowPartnerDetailsModule,
    ModalShowPolicyModule,
    ModalShowPolicyDetailsModule,
    ModalShowQuotationDetailsModule,
    ModalShowReactivationEvidenceModule,
    ModalShowResolutionEvidenceModule,
    ModalShowSinisterDetailsModule,
    ModalTransferContactFileModule,
    ModalUpdateReceiptPaidModule,
    ModalUpdateSinisterEventModule
  ],
  providers: [
      ClientService,
      ContactService,
      ContactFileService,
      ContentListService,
      EndorsementService,
      GroupService,
      GroupMemberService,
      LeadService,
      PartnerService,
      PaymentService,
      PolicyService,
      PolicyLogService,
      QuotationService,
      ReceiptPaidService,
      SinisterService
  ]
})
export class ContentListModule { }
