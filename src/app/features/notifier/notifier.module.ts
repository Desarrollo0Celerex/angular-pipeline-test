import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotifierService } from './services/notifier.service';
import { SendNotificationModalComponent } from './components/send-notification-modal/send-notification-modal.component';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PaymentModule } from '@payment/payment.module';

@NgModule({
    declarations: [SendNotificationModalComponent],
    exports: [SendNotificationModalComponent],
    imports: [CommonModule, ReactiveFormsModule, SharedModule],
    providers: [NotifierService],
})
export class NotifierModule {}
