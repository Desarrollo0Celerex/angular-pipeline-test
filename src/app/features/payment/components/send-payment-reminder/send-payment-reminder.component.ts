import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { SendNotificationModalComponent } from '@notifier/components/send-notification-modal/send-notification-modal.component';
import { WhatsappNotifictionData } from '@notifier/interfaces/whatsapp-notification-data.interface';
import { NOTIFICATION_TYPES } from '@notifier/services/notifier.service';
import { SendPaymentMessageModalComponent } from '../send-payment-message-modal/send-payment-message-modal.component';

@Component({
    selector: 'agt-send-payment-reminder',
    templateUrl: './send-payment-reminder.component.html',
    styles: [],
})
export class SendPaymentReminderComponent {
    @Output() reminderSent = new EventEmitter<void>();
    @ViewChild(SendNotificationModalComponent)
    sendNotificationModalComponent!: SendNotificationModalComponent;
    @ViewChild(SendPaymentMessageModalComponent)
    sendPaymentMessageModalComponent!: SendPaymentMessageModalComponent;
    private _contactId?: string = undefined;
    private _policyId?: string = undefined;
    private _paymentId?: string = undefined;

    openModal(contactId: string, policyId: string, paymentId: string): void {
        this._contactId = contactId;
        this._policyId = policyId;
        this._paymentId = paymentId;
        this._openModalSendNotification();
    }

    checkHasWhatsappNotification(data: WhatsappNotifictionData | null): void {
        if (data !== null) {
            this.sendPaymentMessageModalComponent.openModal(
                data.phone,
                data.message,
                this._paymentId!
            );
        } else {
            this.notifyReminderSent();
        }
    }

    notifyReminderSent(): void {
        this.reminderSent.emit();
    }

    private _openModalSendNotification(): void {
        this.sendNotificationModalComponent.openModal({
            modalData: {
                title: 'Enviar Recordatorio',
                description: 'Selecciona la acción que deseas realizar.',
                buttonLabel: '🔔 ENVIAR RECORDATORIO',
            },
            notificationTypeId: NOTIFICATION_TYPES.PAYMENT_REMINDER,
            notificationData: {
                contactId: this._contactId,
                policyId: this._policyId,
                paymentId: this._paymentId,
            },
        });
    }
}
