import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PluralNameFormatModule } from '@pipes/plural-name-format/plural-name-format.module';
import { QuotationStatusService } from '@services/quotation-status.service';

import { ModalSelectQuotationStatusComponent } from './modal-select-quotation-status.component';
import { ModalSelectQuotationStatusService } from './modal-select-quotation-status.service';

@NgModule({
  declarations: [ModalSelectQuotationStatusComponent],
  exports: [ModalSelectQuotationStatusComponent],
  imports: [
    CommonModule,
    PluralNameFormatModule,
    RouterModule
  ],
  providers: [ModalSelectQuotationStatusService, QuotationStatusService]
})
export class ModalSelectQuotationStatusModule { }
