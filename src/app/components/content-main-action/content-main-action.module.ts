import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalConfirmCreateGroupModule } from '@components/modal-confirm-create-group/modal-confirm-create-group.module';
import { ModalConfirmCreatePartnerModule } from '@components/modal-confirm-create-partner/modal-confirm-create-partner.module';
import { ModalCreateGroupModule } from '@components/modal-create-group/modal-create-group.module';
import { ModalCreatePartnerModule } from '@components/modal-create-partner/modal-create-partner.module';
import { ModalCreateSinisterModule } from '@components/modal-create-sinister/modal-create-sinister.module';
import { ModalDuplicateGroupModule } from '@components/modal-duplicate-group/modal-duplicate-group.module';
import { ModalDuplicatePartnerModule } from '@components/modal-duplicate-partner/modal-duplicate-partner.module';
import { ModalSearchPaymentModule } from '@components/modal-search-payment/modal-search-payment.module';
import { ModalSearchPolicyModule } from '@components/modal-search-policy/modal-search-policy.module';
import { ModalSelectContactTypeModule } from '@components/modal-select-contact-type/modal-select-contact-type.module';
import { ModalSelectPolicyStatusModule } from '@components/modal-select-policy-status/modal-select-policy-status.module';
import { ModalSelectQuotationStatusModule } from '@components/modal-select-quotation-status/modal-select-quotation-status.module';
import { ModalSelectSinisterStatusModule } from '@components/modal-select-sinister-status/modal-select-sinister-status.module';
import { PluralNameFormatModule } from '@pipes/plural-name-format/plural-name-format.module';
import { PluralNameFormatPipe } from '@pipes/plural-name-format/plural-name-format.pipe';

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
    ModalSearchPaymentModule,
    ModalSearchPolicyModule,
    ModalSelectContactTypeModule,
    ModalSelectPolicyStatusModule,
    ModalSelectQuotationStatusModule,
    ModalSelectSinisterStatusModule,
    PluralNameFormatModule
  ],
  providers: [PluralNameFormatPipe]
})
export class ContentMainActionModule { }
