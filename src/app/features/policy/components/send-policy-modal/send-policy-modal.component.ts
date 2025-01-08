import {
    Component,
    EventEmitter,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import { NOTIFICATION_TYPES } from '@notifier/services/notifier.service';
import { SendNotificationModalComponent } from '@notifier/components/send-notification-modal/send-notification-modal.component';
import { WhatsappNotifictionData } from '@notifier/interfaces/whatsapp-notification-data.interface';
import { SendWhatsappMessageModalComponent } from '../send-whatsapp-message-modal/send-whatsapp-message-modal.component';
import { SmartComponent } from '@core/classes/smart-component';
import { SendNotificationModalService } from '@notifier/components/send-notification-modal/send-notification-modal.service';

@Component({
    selector: 'agt-send-policy-modal',
    templateUrl: './send-policy-modal.component.html',
    styles: [],
})
export class SendPolicyModalComponent extends SmartComponent implements OnInit {
    @Output() policySent = new EventEmitter<{
        notificationWasSent: boolean;
        notificationIsRepeated: boolean;
    }>();
    @ViewChild(SendNotificationModalComponent)
    sendNotificationModalComponent!: SendNotificationModalComponent;
    @ViewChild(SendWhatsappMessageModalComponent)
    sendWhatsappMessageModalComponent!: SendWhatsappMessageModalComponent;
    private _contactId?: string = undefined;
    private _policyId?: string = undefined;

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
                    data.notificationTypeId === NOTIFICATION_TYPES.POLICY_ISSUED
                ) {
                    this._checkHasWhatsappNotification(data);
                }
            });
    }

    openModal(contactId: string, policyId: string): void {
        this._contactId = contactId;
        this._policyId = policyId;
        this._openModalSendNotification();
    }

    private _checkHasWhatsappNotification(
        data: WhatsappNotifictionData | null
    ): void {
        if (data?.phone && data.message) {
            this.sendWhatsappMessageModalComponent.openModal(
                data.phone,
                data.message,
                this._contactId!,
                this._policyId!
            );
        } else {
            this.notifyPolicySent({
                notificationWasSent: data?.notificationWasSent || false,
                notificationIsRepeated: data?.notificationIsRepeated || false,
            });
        }
    }

    notifyPolicySent(data: {
        notificationWasSent: boolean;
        notificationIsRepeated: boolean;
    }): void {
        this.policySent.emit(data);
    }

    private _openModalSendNotification(): void {
        this._sendNotificationModalService.openModal({
            modalData: {
                title: 'Enviar Póliza',
                description: 'Selecciona la acción que deseas realizar.',
                buttonLabel: '📲 ENVIAR PÓLIZA',
            },
            notificationTypeId: NOTIFICATION_TYPES.POLICY_ISSUED,
            notificationData: {
                contactId: this._contactId,
                policyId: this._policyId,
            },
        });
    }
}
