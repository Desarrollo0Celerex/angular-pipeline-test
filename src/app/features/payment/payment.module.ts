import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { SendPaymentReminderComponent } from './components/send-payment-reminder/send-payment-reminder.component';
import { NotifierModule } from '@notifier/notifier.module';
import { PaymentService } from './services/payment.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { PaymentTypeModule } from '@payment-type/payment-type.module';
import { PaymentAppliedActionsModalComponent } from './components/payment-applied-actions-modal/payment-applied-actions-modal.component';
import { SendPaymentReminderWhatsappMessageModalComponent } from './components/send-payment-reminder-whatsapp-message-modal/send-payment-reminder-whatsapp-message-modal.component';
import { SendPaymentConfirmationWhatsappMessageModalComponent } from './components/send-payment-confirmation-whatsapp-message-modal/send-payment-confirmation-whatsapp-message-modal.component';
import { SendPaymentConfirmationModalComponent } from './components/send-payment-confirmation-modal/send-payment-confirmation-modal.component';

@NgModule({
    declarations: [
        SendPaymentReminderComponent,
        SendPaymentReminderWhatsappMessageModalComponent,
        PaymentAppliedActionsModalComponent,
        SendPaymentConfirmationWhatsappMessageModalComponent,
        SendPaymentConfirmationModalComponent,
    ],
    exports: [
        PaymentAppliedActionsModalComponent,
        SendPaymentReminderComponent,
    ],
    imports: [
        CommonModule,
        NotifierModule,
        PaymentTypeModule,
        ReactiveFormsModule,
        RouterModule,
        SharedModule,
    ],
    providers: [CurrencyPipe, PaymentService],
})
export class PaymentModule {}
