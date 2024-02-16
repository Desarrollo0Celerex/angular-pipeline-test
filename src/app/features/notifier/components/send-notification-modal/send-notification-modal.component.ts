import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { SHIPPING_CHANNELS } from '@core/constants/settings';
import { LoadingService } from '@core/services/loading/loading.service';
import { NotificationChannel } from '@notifier/interfaces/notification-channel';
import { SendNotificationResponse } from '@notifier/interfaces/send-notification-response';
import {
    NOTIFICATION_CHANNELS,
    NotifierService,
} from '@notifier/services/notifier.service';
import { PolicyService } from '@policy/services/policy.service';
import { ShippingChannelsComponent } from '@shared/components/shipping-channels/shipping-channels.component';
import { SendNotificationModalData } from '@notifier/interfaces/send-notification-modal-data.interface';
import { WhatsappNotifictionData } from '@notifier/interfaces/whatsapp-notification-data.interface';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-send-notification-modal',
    templateUrl: './send-notification-modal.component.html',
    styles: [],
})
export class SendNotificationModalComponent {
    @Output() notificationSent =
        new EventEmitter<WhatsappNotifictionData | null>();
    @ViewChild(ShippingChannelsComponent)
    shippingChannelsComponent!: ShippingChannelsComponent;
    data?: SendNotificationModalData;
    modalId = 'agt-send-notification-modal';
    private _phone?: string;

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
                notificationTypeId: this.data!.notificationTypeId,
                contact: data.email,
            });
        }
        if (data.hasPhone) {
            notificationChannels.push({
                channelId: NOTIFICATION_CHANNELS.WHATSAPP,
                notificationTypeId: this.data!.notificationTypeId,
                contact: this._phone,
            });
        }

        this._sendNotification(notificationChannels);
    }

    openModal(modalData: SendNotificationModalData): void {
        this.data = modalData;
        ModalPlugin.show(this.modalId);
        this._loadPolicy();
    }

    private _checkHasWhatsappNotification(
        res: SendNotificationResponse[]
    ): void {
        const whatsappMessage = this._searchWhatsappMessage(res);
        if (whatsappMessage) {
            this.notificationSent.emit({
                phone: this._phone!,
                message: whatsappMessage,
            });
        } else {
            this.notificationSent.emit(null);
        }
    }

    private _loadPolicy(): void {
        const fields = 'titularPhoneCode,titularPhoneNumber,titularEmail';
        this._policyService
            .getContactPolicy(
                this.data!.notificationData.contactId!,
                this.data!.notificationData.policyId!,
                fields
            )
            .subscribe((policy) => {
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
            ...this.data?.notificationData,
            notificationChannels,
        };
        this._notifierService.sendNotification(requestBody).subscribe((res) => {
            this._loadingService.hide();
            this._checkHasWhatsappNotification(res);
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
