import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { LoadingService } from '@core/services/loading/loading.service';
import { NotificationChannel } from '@notifier/interfaces/notification-channel';
import {
    NOTIFICATION_CHANNELS,
    NOTIFICATION_TYPES,
    NotifierService,
} from '@notifier/services/notifier.service';
import { Policy } from '@policies/interfaces/policy.interface';
import { PolicyService } from '@policies/services/policy.service';
import { ShippingChannelsComponent } from '@shared/components/shipping-channels/shipping-channels.component';
import { SendWhatsappMessageModalComponent } from '../send-whatsapp-message-modal/send-whatsapp-message-modal.component';
import { SHIPPING_CHANNELS } from '@core/constants/settings';
import { SendNotificationResponse } from '@notifier/interfaces/send-notification-response';
declare var ModalPlugin: any;

@Component({
    selector: 'agt-send-policy-modal',
    templateUrl: './send-policy-modal.component.html',
    styles: [],
})
export class SendPolicyModalComponent {
    @Output() policySent = new EventEmitter<void>();
    @ViewChild(ShippingChannelsComponent)
    shippingChannelsComponent!: ShippingChannelsComponent;
    @ViewChild(SendWhatsappMessageModalComponent)
    sendWhatsappMessageModalComponent!: SendWhatsappMessageModalComponent;
    modalId = 'agt-send-policy-modal';
    private _contactId = '';
    private _policyId = '';
    private _policy: Policy | undefined = undefined;
    private _phone = '';

    constructor(
        private _loadingService: LoadingService,
        private _notifierService: NotifierService,
        private _policyService: PolicyService
    ) {}

    generateNotificationChannels(data: {
        hasPhone: boolean;
        hasEmail: boolean;
        phoneCode: string;
        phoneNumber: string;
        email: string;
    }): void {
        this._phone = data.phoneCode + data.phoneNumber;
        const notificationChannels: NotificationChannel[] = [];
        if (data.hasEmail) {
            notificationChannels.push({
                channelId: NOTIFICATION_CHANNELS.EMAIL,
                notificationTypeId: NOTIFICATION_TYPES.POLICY_ISSUED,
                contact: data.email,
            });
        }
        if (data.hasPhone) {
            notificationChannels.push({
                channelId: NOTIFICATION_CHANNELS.WHATSAPP,
                notificationTypeId: NOTIFICATION_TYPES.POLICY_ISSUED,
                contact: data.phoneNumber,
            });
        }

        this._sendNotification(notificationChannels);
    }

    notifyPolicySent(): void {
        this.policySent.emit();
    }

    show(contactId: string, policyId: string): void {
        this._contactId = contactId;
        this._policyId = policyId;
        this._loadPolicy();
        ModalPlugin.show(this.modalId);
    }

    private _loadPolicy(): void {
        const fields =
            'titularPhoneCode,titularPhoneNumber,titularEmail,policyNumber,insurerName,insuranceName,policyAmount';
        this._policyService
            .getContactPolicy(this._contactId, this._policyId, fields)
            .subscribe((policy) => {
                this._policy = policy;
                this.shippingChannelsComponent.fillForm({
                    phoneCode: policy.titularPhoneCode,
                    phoneNumber: policy.titularPhoneNumber,
                    email: policy.titularEmail,
                });
            });
    }

    private _sendNotification(
        notificationChannels: NotificationChannel[]
    ): void {
        this._loadingService.show();
        ModalPlugin.hide(this.modalId);
        const requestBody = {
            contactId: this._contactId,
            policyId: this._policyId,
            notificationChannels,
        };
        this._notifierService.sendNotification(requestBody).subscribe((res) => {
            this._loadingService.hide();
            // Search whatsapp link
            const whatsappMessage = this._searchWhatsappMessage(res);
            console.log('paso 1: ', whatsappMessage);
            if (whatsappMessage) {
                console.log('paso 2');
                this.sendWhatsappMessageModalComponent.openModal(
                    this._policy,
                    this._phone,
                    whatsappMessage
                );
            } else {
                console.log('paso 3');
                this.notifyPolicySent();
            }
        });
    }

    private _searchWhatsappMessage(
        data: SendNotificationResponse[]
    ): string | null {
        const whatsappChannel = data.find(
            (value) =>
                value.channelId === SHIPPING_CHANNELS.WHATSAPP && value.success
        );
        if (whatsappChannel) {
            return whatsappChannel.whatsappMessage!;
        }
        return null;
    }
}
