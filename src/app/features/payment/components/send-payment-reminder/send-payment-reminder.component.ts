import {
    Component,
    EventEmitter,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import { SendNotificationModalComponent } from '@notifier/components/send-notification-modal/send-notification-modal.component';
import { WhatsappNotifictionData } from '@notifier/interfaces/whatsapp-notification-data.interface';
import { NOTIFICATION_TYPES } from '@notifier/services/notifier.service';
import { SendPaymentReminderWhatsappMessageModalComponent } from '../send-payment-reminder-whatsapp-message-modal/send-payment-reminder-whatsapp-message-modal.component';
import { SendNotificationModalService } from '@notifier/components/send-notification-modal/send-notification-modal.service';
import { SmartComponent } from '@core/classes/smart-component';
import { LastReminderAlertComponent } from '@shared/components/last-reminder-alert/last-reminder-alert.component';

@Component({
    selector: 'agt-send-payment-reminder',
    templateUrl: './send-payment-reminder.component.html',
    styles: [],
})
export class SendPaymentReminderComponent
    extends SmartComponent
    implements OnInit
{
    @Output() reminderSent = new EventEmitter<boolean>();
    @ViewChild(LastReminderAlertComponent)
    lastReminderAlertComponent!: LastReminderAlertComponent;
    @ViewChild(SendNotificationModalComponent)
    sendNotificationModalComponent!: SendNotificationModalComponent;
    @ViewChild(SendPaymentReminderWhatsappMessageModalComponent)
    sendPaymentMessageModalComponent!: SendPaymentReminderWhatsappMessageModalComponent;
    private _contactId?: string = undefined;
    private _policyId?: string = undefined;
    private _paymentId?: string = undefined;

    constructor(
        private _sendNotificationModalService: SendNotificationModalService
    ) {
        super();
    }

    ngOnInit(): void {
        this._sendNotificationModalService.notificationSent$
            .pipe(this.untilComponentDestroy())
            .subscribe((data: WhatsappNotifictionData) => {
                if (
                    data.notificationTypeId ===
                    NOTIFICATION_TYPES.PAYMENT_REMINDER
                ) {
                    this._checkHasWhatsappNotification(data);
                }
            });
    }

    openModal(contactId: string, policyId: string, paymentId: string): void {
        this._contactId = contactId;
        this._policyId = policyId;
        this._paymentId = paymentId;
        this._openModalSendNotification();
        this._sendNotificationModalService.showAlertLastReminder({
            contactId,
            policyId,
            paymentId,
        });
    }

    private _checkHasWhatsappNotification(
        data: WhatsappNotifictionData | null
    ): void {
        if (data?.phone && data.message) {
            this.sendPaymentMessageModalComponent.openModal(
                data.phone,
                data.message,
                this._paymentId!
            );
        } else {
            this.notifyReminderSent(data?.notificationWasSent || false);
        }
    }

    notifyReminderSent(notificationWasSent: boolean): void {
        this.reminderSent.emit(notificationWasSent);
    }

    private _openModalSendNotification(): void {
        this._sendNotificationModalService.openModal({
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
