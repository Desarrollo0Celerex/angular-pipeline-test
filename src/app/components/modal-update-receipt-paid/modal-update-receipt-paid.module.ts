import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
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
    LoadingContentModule
  ],
  providers: [
      ReceiptPaidService
  ]
})
export class ModalUpdateReceiptPaidModule { }
