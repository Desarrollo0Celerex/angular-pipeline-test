import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { ModalNotifyAmountExceededModule } from '@components/modal-notify-amount-exceeded/modal-notify-amount-exceeded.module';
import { ModalNotifyReceiptsExceededModule } from '@components/modal-notify-receipts-exceeded/modal-notify-receipts-exceeded.module';
import { ModalNotifyMissingReceiptsModule } from '@components/modal-notify-missing-receipts/modal-notify-missing-receipts.module';
import { ModalNotifyMissingAmountModule } from '@components/modal-notify-missing-amount/modal-notify-missing-amount.module';
import { ModalSelectEvidenceModule } from '@components/modal-select-evidence/modal-select-evidence.module';
import { PaymentService } from '@services/payment.service';
import { PaymentTypeService } from '@services/payment-type.service';
import { ReceiptPaidService } from '@services/receipt-paid.service';

import { ModalApplyPaymentComponent } from './modal-apply-payment.component';
import { PaymentModule } from '@payment/payment.module';

@NgModule({
    declarations: [ModalApplyPaymentComponent],
    exports: [ModalApplyPaymentComponent],
    imports: [
        CommonModule,
        FormsModule,
        LoadingContentModule,
        ReactiveFormsModule,
        ModalNotifyAmountExceededModule,
        ModalNotifyReceiptsExceededModule,
        ModalNotifyMissingReceiptsModule,
        ModalNotifyMissingAmountModule,
        ModalSelectEvidenceModule,
        PaymentModule,
    ],
    providers: [
        CurrencyPipe,
        PaymentService,
        PaymentTypeService,
        ReceiptPaidService,
    ],
})
export class ModalApplyPaymentModule {}
