import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalShowPaymentAppliedDetailsComponent } from './modal-show-payment-applied-details.component';
import { ReceiptPaidService } from '@services/receipt-paid.service';
import { LoadingContentModule } from '@components/loading-content/loading-content.module';

@NgModule({
    declarations: [ModalShowPaymentAppliedDetailsComponent],
    exports: [ModalShowPaymentAppliedDetailsComponent],
    imports: [CommonModule, LoadingContentModule],
    providers: [ReceiptPaidService],
})
export class ModalShowPaymentAppliedDetailsModule {}
