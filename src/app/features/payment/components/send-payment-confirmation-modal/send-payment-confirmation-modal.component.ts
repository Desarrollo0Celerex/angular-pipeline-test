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
import { SendPaymentConfirmationWhatsappMessageModalComponent } from '../send-payment-confirmation-whatsapp-message-modal/send-payment-confirmation-whatsapp-message-modal.component';
import { SendNotificationModalService } from '@notifier/components/send-notification-modal/send-notification-modal.service';
import { SmartComponent } from '@core/classes/smart-component';

@Component({
    selector: 'agt-send-payment-confirmation-modal',
    templateUrl: './send-payment-confirmation-modal.component.html',
    styles: [],
})
export class SendPaymentConfirmationModalComponent
    extends SmartComponent
    implements OnInit
{
    @Output() confirmationSent = new EventEmitter<void>();
    @ViewChild(SendPaymentConfirmationWhatsappMessageModalComponent)
    sendPaymentConfirmationWhatsappMessageModalComponent!: SendPaymentConfirmationWhatsappMessageModalComponent;
    private _contactId?: string = undefined;
    private _policyId?: string = undefined;
    private _receiptPaidId?: string = undefined;

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
                    NOTIFICATION_TYPES.PAYMENT_CONFIRMATION
                ) {
                    this._checkHasWhatsappNotification(data);
                }
            });
    }

    openModal(
        contactId: string,
        policyId: string,
        receiptPaidId: string
    ): void {
        this._contactId = contactId;
        this._policyId = policyId;
        this._receiptPaidId = receiptPaidId;
        this._openModalSendNotification();
    }

    private _checkHasWhatsappNotification(
        data: WhatsappNotifictionData | null
    ): void {
        if (data?.phone && data.message) {
            this.sendPaymentConfirmationWhatsappMessageModalComponent.openModal(
                data.phone,
                data.message,
                this._receiptPaidId!
            );
        } else {
            this.notifyConfirmationSent();
        }
    }

    notifyConfirmationSent(): void {
        this.confirmationSent.emit();
    }

    private _openModalSendNotification(): void {
        this._sendNotificationModalService.openModal({
            modalData: {
                title: 'Enviar Confirmación',
                description:
                    'Ingresa los detalles para enviar la confirmación de pago.',
                buttonLabel: '📲 ENVIAR CONFIRMACIÓN',
            },
            notificationTypeId: NOTIFICATION_TYPES.PAYMENT_CONFIRMATION,
            notificationData: {
                contactId: this._contactId,
                policyId: this._policyId,
                receiptPaidId: this._receiptPaidId,
            },
        });
    }
}
