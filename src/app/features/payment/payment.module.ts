import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SendPaymentReminderComponent } from './components/send-payment-reminder/send-payment-reminder.component';
import { NotifierModule } from '@notifier/notifier.module';
import { SendPaymentMessageModalComponent } from './components/send-payment-message-modal/send-payment-message-modal.component';
import { PaymentService } from './services/payment.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        SendPaymentReminderComponent,
        SendPaymentMessageModalComponent,
    ],
    exports: [SendPaymentReminderComponent],
    imports: [CommonModule, NotifierModule, ReactiveFormsModule],
    providers: [PaymentService],
})
export class PaymentModule {}
