import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuotationService } from '@services/quotation.service';

import { ModalConfirmAcceptQuotationComponent } from './modal-confirm-accept-quotation.component';
import { ModalConfirmAcceptQuotationService } from './modal-confirm-accept-quotation.service';

@NgModule({
  declarations: [ModalConfirmAcceptQuotationComponent],
  exports: [ModalConfirmAcceptQuotationComponent],
  imports: [
    CommonModule
  ],
  providers: [ModalConfirmAcceptQuotationService, QuotationService]
})
export class ModalConfirmAcceptQuotationModule { }
