import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { ModalErrorUpdatingPaidReceiptModule } from '@components/modal-error-updating-paid-receipt/modal-error-updating-paid-receipt.module';
import { ModalSelectEvidenceModule } from '@components/modal-select-evidence/modal-select-evidence.module';
import { PaymentTypeService } from '@services/payment-type.service';
import { ReceiptPaidService } from '@services/receipt-paid.service';

import { ModalUpdateReceiptPaidComponent } from './modal-update-receipt-paid.component';

@NgModule({
  declarations: [
    ModalUpdateReceiptPaidComponent
  ],
  exports: [
      ModalUpdateReceiptPaidComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoadingContentModule,
    ModalErrorUpdatingPaidReceiptModule,
    ModalSelectEvidenceModule
  ],
  providers: [
      PaymentTypeService,
      ReceiptPaidService
  ]
})
export class ModalUpdateReceiptPaidModule { }
