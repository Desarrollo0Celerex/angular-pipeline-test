import { EventEmitter, Injectable, Output } from '@angular/core';
import { CONTACT_ACTIONS } from '@contact/enums/contact-actions.enum';
import { SendNotificationModalData } from '@notifier/interfaces/send-notification-modal-data.interface';
import { WhatsappNotifictionData } from '@notifier/interfaces/whatsapp-notification-data.interface';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SendNotificationModalService {
    sendNotificationModal$ = new Subject<SendNotificationModalData>();
    showAlertLastReminder$ = new Subject<{
        contactId: string;
        policyId: string;
        paymentId: string;
    }>();
    @Output() notificationSent$ = new EventEmitter<WhatsappNotifictionData>();

    openModal(data: SendNotificationModalData): void {
        this.sendNotificationModal$.next(data);
    }

    showAlertLastReminder(data: {
        contactId: string;
        policyId: string;
        paymentId: string;
    }): void {
        this.showAlertLastReminder$.next(data);
    }
}
