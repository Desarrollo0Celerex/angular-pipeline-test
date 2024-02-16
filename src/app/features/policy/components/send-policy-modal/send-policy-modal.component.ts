import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { NOTIFICATION_TYPES } from '@notifier/services/notifier.service';
import { SendNotificationModalComponent } from '@notifier/components/send-notification-modal/send-notification-modal.component';
import { WhatsappNotifictionData } from '@notifier/interfaces/whatsapp-notification-data.interface';
import { SendWhatsappMessageModalComponent } from '../send-whatsapp-message-modal/send-whatsapp-message-modal.component';

@Component({
    selector: 'agt-send-policy-modal',
    templateUrl: './send-policy-modal.component.html',
    styles: [],
})
export class SendPolicyModalComponent {
    @Output() policySent = new EventEmitter<void>();
    @ViewChild(SendNotificationModalComponent)
    sendNotificationModalComponent!: SendNotificationModalComponent;
    @ViewChild(SendWhatsappMessageModalComponent)
    sendWhatsappMessageModalComponent!: SendWhatsappMessageModalComponent;
    private _contactId?: string = undefined;
    private _policyId?: string = undefined;

    openModal(contactId: string, policyId: string): void {
        this._contactId = contactId;
        this._policyId = policyId;
        this._openModalSendNotification();
    }

    checkHasWhatsappNotification(data: WhatsappNotifictionData | null): void {
        if (data !== null) {
            this.sendWhatsappMessageModalComponent.openModal(
                data.phone,
                data.message,
                this._contactId!,
                this._policyId!
            );
        } else {
            this.notifyPolicySent();
        }
    }

    notifyPolicySent(): void {
        this.policySent.emit();
    }

    private _openModalSendNotification(): void {
        this.sendNotificationModalComponent.openModal({
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
