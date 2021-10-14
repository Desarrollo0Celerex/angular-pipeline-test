import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalCreatePartnerModule } from '@components/modal-create-partner/modal-create-partner.module';
import { ModalCreateSinisterModule } from '@components/modal-create-sinister/modal-create-sinister.module';
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
    ModalCreatePartnerModule,
    ModalCreateSinisterModule,
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
