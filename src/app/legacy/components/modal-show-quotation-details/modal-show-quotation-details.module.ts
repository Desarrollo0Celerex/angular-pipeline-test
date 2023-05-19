import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuotationService } from '@services/quotation.service';

import { ModalShowQuotationDetailsComponent } from './modal-show-quotation-details.component';
import { ModalShowQuotationDetailsService } from './modal-show-quotation-details.service';

@NgModule({
  declarations: [ModalShowQuotationDetailsComponent],
  exports: [ModalShowQuotationDetailsComponent],
  imports: [
    CommonModule
  ],
  providers: [ModalShowQuotationDetailsService, QuotationService]
})
export class ModalShowQuotationDetailsModule { }
