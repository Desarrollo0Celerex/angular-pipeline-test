import { Component, OnInit, ViewChild } from '@angular/core';
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
import { SendNotificationModalService } from './send-notification-modal.service';
import { SmartComponent } from '@core/classes/smart-component';
import { LastReminderAlertComponent } from '@shared/components/last-reminder-alert/last-reminder-alert.component';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-send-notification-modal',
    templateUrl: './send-notification-modal.component.html',
    styles: [],
    standalone: false
})
export class SendNotificationModalComponent
    extends SmartComponent
    implements OnInit
{
    @ViewChild(LastReminderAlertComponent)
    lastReminderAlertComponent!: LastReminderAlertComponent;
    @ViewChild(ShippingChannelsComponent)
    shippingChannelsComponent!: ShippingChannelsComponent;
    data?: SendNotificationModalData;
    modalId = 'agt-send-notification-modal';
    private _phone?: string;

    constructor(
        private _loadingService: LoadingService,
        private _notifierService: NotifierService,
        private _policyService: PolicyService,
        private _sendNotificationModalService: SendNotificationModalService
    ) {
        super();
    }

    ngOnInit(): void {
        this._sendNotificationModalService.sendNotificationModal$
            .pipe(this.untilComponentDestroy())
            .subscribe((data) => {
                this.data = data;
                this._openModal();
            });

        this._sendNotificationModalService.showAlertLastReminder$
            .pipe(this.untilComponentDestroy())
            .subscribe((data) => {
                this.lastReminderAlertComponent.showAlert({
                    contactId: data.contactId,
                    policyId: data.policyId,
                    paymentId: data.paymentId,
                });
            });
    }

    generateNotificationChannels(data: {
        hasPhone: boolean;
        hasEmail: boolean;
        phoneCode: string;
        phoneNumber: string;
        email: string;
        bcc?: string;
    }): void {
        this._phone = data.phoneCode + data.phoneNumber;
        const notificationChannels: NotificationChannel[] = [];
        if (data.hasEmail) {
            notificationChannels.push({
                channelId: NOTIFICATION_CHANNELS.EMAIL,
                notificationTypeId: this.data!.notificationTypeId,
                contact: data.email,
                bcc: data.bcc ? data.bcc : null,
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

    closeModal(): void {
        this.lastReminderAlertComponent.hideAlert();
        ModalPlugin.hide(this.modalId);
    }

    private _openModal(): void {
        ModalPlugin.show(this.modalId);
        this._loadPolicy();
    }

    private _checkHasWhatsappNotification(
        res: SendNotificationResponse[]
    ): void {
        const whatsappMessage = this._searchWhatsappMessage(res);
        if (whatsappMessage) {
            this._sendNotificationModalService.notificationSent$.emit({
                phone: this._phone!,
                message: whatsappMessage,
                notificationTypeId: this.data!.notificationTypeId,
                notificationWasSent: true,
                notificationIsRepeated: false,
            });
        } else {
            this._sendNotificationModalService.notificationSent$.emit({
                notificationTypeId: this.data!.notificationTypeId,
                notificationWasSent: true,
                notificationIsRepeated: false,
            });
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
        this.closeModal();
        const requestBody = {
            ...this.data?.notificationData,
            notificationChannels,
        };
        this._notifierService.sendNotification(requestBody).subscribe((res) => {
            this._loadingService.hide();
            const hasResponseError = this._checkHasResponseError(res);
            if (hasResponseError) {
                const notificationIsRepeated = this._checkIsRepeated(res);
                this._sendNotificationModalService.notificationSent$.emit({
                    notificationTypeId: this.data!.notificationTypeId,
                    notificationWasSent: false,
                    notificationIsRepeated,
                });
            } else {
                this._checkHasWhatsappNotification(res);
            }
        });
    }

    private _checkIsRepeated(response: SendNotificationResponse[]): boolean {
        for (let data of response) {
            if (data['isRepeated'] === true) {
                return true;
            }
        }
        return false;
    }

    private _checkHasResponseError(
        response: SendNotificationResponse[]
    ): boolean {
        for (let data of response) {
            if (data['success'] === false) {
                return true;
            }
        }
        return false;
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
