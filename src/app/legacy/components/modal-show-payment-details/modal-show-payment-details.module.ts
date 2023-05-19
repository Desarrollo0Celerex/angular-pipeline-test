import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalShowPaymentDetailsComponent } from './modal-show-payment-details.component';
import { RouterModule } from '@angular/router';
import { PaymentService } from '@services/payment.service';
import { LoadingContentModule } from '@components/loading-content/loading-content.module';

@NgModule({
    declarations: [ModalShowPaymentDetailsComponent],
    exports: [ModalShowPaymentDetailsComponent],
    imports: [CommonModule, RouterModule, LoadingContentModule],
    providers: [PaymentService],
})
export class ModalShowPaymentDetailsModule {}
