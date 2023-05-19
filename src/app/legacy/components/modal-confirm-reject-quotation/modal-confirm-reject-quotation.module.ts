import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalConfirmRejectQuotationComponent } from './modal-confirm-reject-quotation.component';
import { ModalConfirmRejectQuotationService } from './modal-confirm-reject-quotation.service'

@NgModule({
  declarations: [ModalConfirmRejectQuotationComponent],
  exports: [ModalConfirmRejectQuotationComponent],
  imports: [
    CommonModule
  ],
  providers: [ModalConfirmRejectQuotationService]
})
export class ModalConfirmRejectQuotationModule { }
