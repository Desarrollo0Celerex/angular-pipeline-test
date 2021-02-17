import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuotationService } from '@services/quotation.service';

import { ModalAcceptQuotationComponent } from './modal-accept-quotation.component';
import { ModalAcceptQuotationService } from './modal-accept-quotation.service';

@NgModule({
  declarations: [ModalAcceptQuotationComponent],
  exports: [ModalAcceptQuotationComponent],
  imports: [
    CommonModule
  ],
  providers: [ModalAcceptQuotationService, QuotationService]
})
export class ModalAcceptQuotationModule { }
