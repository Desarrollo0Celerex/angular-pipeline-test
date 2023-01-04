import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalConfirmCreateGroupModule } from '@components/modal-confirm-create-group/modal-confirm-create-group.module';
import { ModalConfirmCreatePartnerModule } from '@components/modal-confirm-create-partner/modal-confirm-create-partner.module';
import { ModalCreateGroupModule } from '@components/modal-create-group/modal-create-group.module';
import { ModalCreatePartnerModule } from '@components/modal-create-partner/modal-create-partner.module';
import { ModalCreateSinisterModule } from '@components/modal-create-sinister/modal-create-sinister.module';
import { ModalDuplicateGroupModule } from '@components/modal-duplicate-group/modal-duplicate-group.module';
import { ModalDuplicatePartnerModule } from '@components/modal-duplicate-partner/modal-duplicate-partner.module';
import { ModalSearchClientModule } from '@components/modal-search-client/modal-search-client.module';
import { ModalSearchPaymentModule } from '@components/modal-search-payment/modal-search-payment.module';
import { ModalSearchPolicyModule } from '@components/modal-search-policy/modal-search-policy.module';
import { ModalSelectContactTypeModule } from '@components/modal-select-contact-type/modal-select-contact-type.module';
import { ModalSelectPolicyInsuredUploadTypeModule } from '@components/modal-select-policy-insured-upload-type/modal-select-policy-insured-upload-type.module';
import { ModalSelectPolicyStatusModule } from '@components/modal-select-policy-status/modal-select-policy-status.module';
import { ModalSelectQuotationStatusModule } from '@components/modal-select-quotation-status/modal-select-quotation-status.module';
import { ModalSelectReportFormatModule } from '@components/modal-select-report-format/modal-select-report-format.module';
import { ModalSelectSinisterStatusModule } from '@components/modal-select-sinister-status/modal-select-sinister-status.module';
import { ModalShowPolicyInsuredActionsModule } from '@components/modal-show-policy-insured-actions/modal-show-policy-insured-actions.module';
import { PluralNameFormatModule } from '@pipes/plural-name-format/plural-name-format.module';
import { PluralNameFormatPipe } from '@pipes/plural-name-format/plural-name-format.pipe';
import { PolicyInsuredService } from '@services/policy-insured.service';

import { ContentMainActionComponent } from './content-main-action.component';

@NgModule({
  declarations: [ContentMainActionComponent],
  exports: [ContentMainActionComponent],
  imports: [
    CommonModule,
    ModalConfirmCreateGroupModule,
    ModalConfirmCreatePartnerModule,
    ModalCreateGroupModule,
    ModalCreatePartnerModule,
    ModalCreateSinisterModule,
    ModalDuplicateGroupModule,
    ModalDuplicatePartnerModule,
    ModalSearchClientModule,
    ModalSearchPaymentModule,
    ModalSearchPolicyModule,
    ModalSelectContactTypeModule,
    ModalSelectPolicyInsuredUploadTypeModule,
    ModalSelectPolicyStatusModule,
    ModalSelectQuotationStatusModule,
    ModalSelectReportFormatModule,
    ModalSelectSinisterStatusModule,
    ModalShowPolicyInsuredActionsModule,
    PluralNameFormatModule
  ],
  providers: [
    PluralNameFormatPipe,
    PolicyInsuredService
  ]
})
export class ContentMainActionModule { }
