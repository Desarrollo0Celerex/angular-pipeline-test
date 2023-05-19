import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
    NgxQrcodeErrorCorrectionLevels,
    NgxQrcodeElementTypes,
} from '@techiediaries/ngx-qrcode';
import { CALENDARS } from '@configs/constants.config';
import * as moment from 'moment';
declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-sync-calendar',
    templateUrl: './modal-sync-calendar.component.html',
    styles: [],
})
export class ModalSyncCalendarComponent implements OnChanges {
    @Input() modalId = '';
    @Input() calendar = 0;
    @Input() eventDate = '';
    @Input() eventTime = '';
    @Input() eventDescription = '';
    eventLink = '';
    correctionLevel: any = NgxQrcodeElementTypes.URL;
    elementType: any = NgxQrcodeErrorCorrectionLevels.HIGH;

    ngOnChanges(changes: SimpleChanges): void {
        if (
            this.calendar &&
            this.eventDate &&
            this.eventTime &&
            this.eventDescription
        ) {
            this._generateLink();
        }
    }

    goToCalendarEvent(): void {
        this._executeLink(this.eventLink);
        ModalPlugin.hide(this.modalId);
    }

    private _executeLink(eventLink: string): void {
        const link = document.createElement('a');
        link.target = '_blank';
        link.href = eventLink;
        link.click();
        link.remove();
    }

    private _generateLink(): void {
        switch (this.calendar) {
            case CALENDARS.GOOGLE:
                this.eventLink = this._generateGoogleLink();
                break;

            case CALENDARS.OUTLOOK:
                this.eventLink = this._generateOutlookLink();
                break;

            default:
                this.eventLink = '';
                break;
        }
    }

    private _generateGoogleLink(): string {
        const startDatetime = moment(
            this.eventDate + ' ' + this.eventTime,
            'DD/MM/YYYY h:mm A'
        );
        const startDatetimeStr = startDatetime.format('YYYYMMDDTHHmmssZ');
        const endDatetimeStr = startDatetime
            .add(15, 'minutes')
            .format('YYYYMMDDTHHmmssZ');
        let link =
            'https://calendar.google.com/calendar/render?action=TEMPLATE';
        link += '&';
        link += 'dates=' + startDatetimeStr + '/' + endDatetimeStr;
        link += '&';
        link += 'details=' + encodeURIComponent(this.eventDescription);
        link += '&';
        link += 'text=💰 Seguimiento de Cobranza';
        return link;
    }

    private _generateOutlookLink(): string {
        const startDatetime = moment(
            this.eventDate + ' ' + this.eventTime,
            'DD/MM/YYYY h:mm A'
        );
        const startDatetimeStr = startDatetime.format('YYYY-MM-DDTHH:mm:ss');
        const endDatetimeStr = startDatetime
            .add(15, 'minutes')
            .format('YYYY-MM-DDTHH:mm:ss');
        let link = 'https://outlook.live.com/calendar/0/deeplink/compose?';
        link += 'body=' + encodeURIComponent(this.eventDescription);
        link += '&';
        link += 'location=' + encodeURIComponent('https://app.agenthos.com');
        link += '&';
        link += 'path=' + encodeURIComponent('/calendar/action/compose');
        link += '&';
        link += 'rru=addevent';
        link += '&';
        link += 'startdt=' + startDatetimeStr;
        link += '&';
        link += 'enddt=' + endDatetimeStr;
        link += '&';
        link += 'subject=💰 Seguimiento de Cobranza';
        return link;
    }
}
