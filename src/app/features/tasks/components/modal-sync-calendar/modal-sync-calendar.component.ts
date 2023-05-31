import {
    Component,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
} from '@angular/core';
import {
    NgxQrcodeErrorCorrectionLevels,
    NgxQrcodeElementTypes,
} from '@techiediaries/ngx-qrcode';
import { CALENDARS } from '@core/constants/settings';
import * as moment from 'moment';
import { TaskModalService } from '@features/tasks/services/task-modal.service';
import { SmartComponent } from '@core/classes/smart-component';
import { InitModalSyncCalendar } from '@features/tasks/interfaces/init-modal-sync-calendar.interface';
declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-sync-calendar',
    templateUrl: './modal-sync-calendar.component.html',
    styles: [],
})
export class ModalSyncCalendarComponent
    extends SmartComponent
    implements OnInit
{
    modalId = 'agt-modal-sync-calendar';
    eventLink = '';
    correctionLevel: any = NgxQrcodeElementTypes.URL;
    elementType: any = NgxQrcodeErrorCorrectionLevels.HIGH;
    private _data: InitModalSyncCalendar | undefined = undefined;

    constructor(private _taskModalService: TaskModalService) {
        super();
    }

    ngOnInit(): void {
        this._taskModalService.modalSyncCalendar$
            .pipe(this.untilComponentDestroy())
            .subscribe((data) => {
                this._data = data;
                this._generateLink();
                this._showModal();
            });
    }

    goToCalendarEvent(): void {
        this._executeLink(this.eventLink);
    }

    private _executeLink(eventLink: string): void {
        const link = document.createElement('a');
        link.target = '_blank';
        link.href = eventLink;
        link.click();
        link.remove();
    }

    private _generateLink(): void {
        switch (this._data!.calendarId) {
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
            this._data!.taskDate + ' ' + this._data!.taskTime,
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
        link += 'details=' + encodeURIComponent(this._data!.taskDetails);
        link += '&';
        link += 'text=' + this._data!.taskTitle;
        return link;
    }

    private _generateOutlookLink(): string {
        const startDatetime = moment(
            this._data!.taskDate + ' ' + this._data!.taskTime,
            'DD/MM/YYYY h:mm A'
        );
        const startDatetimeStr = startDatetime.format('YYYY-MM-DDTHH:mm:ss');
        const endDatetimeStr = startDatetime
            .add(15, 'minutes')
            .format('YYYY-MM-DDTHH:mm:ss');
        let link = 'https://outlook.live.com/calendar/0/deeplink/compose?';
        link += 'body=' + encodeURIComponent(this._data!.taskDetails);
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
        link += 'subject=' + this._data!.taskTitle;
        return link;
    }

    private _showModal() {
        ModalPlugin.show(this.modalId);
    }
}
