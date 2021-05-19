import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalCreateSinisterModule } from '@components/modal-create-sinister/modal-create-sinister.module';
import { ModalSearchPolicyModule } from '@components/modal-search-policy/modal-search-policy.module';
import { ModalSelectContactTypeModule } from '@components/modal-select-contact-type/modal-select-contact-type.module';
import { ModalSelectPolicyStatusModule } from '@components/modal-select-policy-status/modal-select-policy-status.module';
import { ModalSelectQuotationStatusModule } from '@components/modal-select-quotation-status/modal-select-quotation-status.module';
import { PluralNameFormatModule } from '@pipes/plural-name-format/plural-name-format.module';
import { PluralNameFormatPipe } from '@pipes/plural-name-format/plural-name-format.pipe';

import { ContentMainActionComponent } from './content-main-action.component';

@NgModule({
  declarations: [ContentMainActionComponent],
  exports: [ContentMainActionComponent],
  imports: [
    CommonModule,
    ModalCreateSinisterModule,
    ModalSearchPolicyModule,
    ModalSelectContactTypeModule,
    ModalSelectPolicyStatusModule,
    ModalSelectQuotationStatusModule,
    PluralNameFormatModule
  ],
  providers: [PluralNameFormatPipe]
})
export class ContentMainActionModule { }
