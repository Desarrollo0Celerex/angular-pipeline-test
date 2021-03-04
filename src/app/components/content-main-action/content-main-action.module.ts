import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
    PluralNameFormatModule,
    ModalSelectContactTypeModule,
    ModalSelectPolicyStatusModule,
    ModalSelectQuotationStatusModule
  ],
  providers: [PluralNameFormatPipe]
})
export class ContentMainActionModule { }
