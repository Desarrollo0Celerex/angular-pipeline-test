import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { SendPaymentReminderComponent } from './components/send-payment-reminder/send-payment-reminder.component';
import { NotifierModule } from '@notifier/notifier.module';
import { SendPaymentMessageModalComponent } from './components/send-payment-message-modal/send-payment-message-modal.component';
import { PaymentService } from './services/payment.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LastReminderAlertComponent } from './components/last-reminder-alert/last-reminder-alert.component';
import { SharedModule } from '@shared/shared.module';
import { ApplyPaymentModalComponent } from './components/apply-payment-modal/apply-payment-modal.component';
import { PaymentTypeModule } from '@payment-type/payment-type.module';

@NgModule({
    declarations: [
        SendPaymentReminderComponent,
        SendPaymentMessageModalComponent,
        LastReminderAlertComponent,
        ApplyPaymentModalComponent,
    ],
    exports: [ApplyPaymentModalComponent, SendPaymentReminderComponent],
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
