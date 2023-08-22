import { Component, OnInit } from '@angular/core';
import {
    NgxQrcodeErrorCorrectionLevels,
    NgxQrcodeElementTypes,
} from '@techiediaries/ngx-qrcode';
import { CALENDARS } from '@core/constants/settings';
import * as moment from 'moment';
import { TaskModalService } from '@features/tasks/services/task-modal.service';
import { SmartComponent } from '@core/classes/smart-component';
import { InitModalSyncCalendar } from '@features/tasks/interfaces/init-modal-sync-calendar.interface';
import { Task } from '@features/tasks/interfaces/task.interface';
import { TaskService } from '@features/tasks/services/task.service';
import { ModalHelper } from '@core/helpers/modal.helper';
import { environment } from '@env/environment';

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
    cancelRoute: string | [] = [];
    private _data: InitModalSyncCalendar | undefined = undefined;
    private _task: Task | undefined = undefined;

    constructor(
        private _taskService: TaskService,
        private _taskModalService: TaskModalService
    ) {
        super();
    }

    ngOnInit(): void {
        this._taskModalService.modalSyncCalendar$
            .pipe(this.untilComponentDestroy())
            .subscribe((data) => {
                this._data = data;
                this.cancelRoute = data.cancelRoute;
                this._loadTask();
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
            this._task!.taskDate + ' ' + this._task!.taskTime,
            'YYYY/MM/DD h:mm A'
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
        link += 'details=' + encodeURIComponent(this._task!.taskDetails);
        link += '&';
        link += 'text=' + this._task!.taskTitle;
        return link;
    }

    private _generateOutlookLink(): string {
        const startDatetime = moment(
            this._task!.taskDate + ' ' + this._task!.taskTime,
            'YYYY/MM/DD h:mm A'
        );
        const startDatetimeStr = startDatetime.format('YYYY-MM-DDTHH:mm:ss');
        const endDatetimeStr = startDatetime
            .add(15, 'minutes')
            .format('YYYY-MM-DDTHH:mm:ss');
        let link = 'https://outlook.live.com/calendar/0/deeplink/compose?';
        link += 'body=' + encodeURIComponent(this._task!.taskDetails);
        link += '&';
        link += 'location=' + encodeURIComponent(environment.appAgenthosUrl);
        link += '&';
        link += 'path=' + encodeURIComponent('/calendar/action/compose');
        link += '&';
        link += 'rru=addevent';
        link += '&';
        link += 'startdt=' + startDatetimeStr;
        link += '&';
        link += 'enddt=' + endDatetimeStr;
        link += '&';
        link += 'subject=' + this._task!.taskTitle;
        return link;
    }

    private _loadTask(): void {
        const fields = 'taskTitle,taskDetails,taskDate,taskTime';
        this._taskService
            .getTask(this._data!.taskId, fields)
            .subscribe((task) => {
                this._task = task;
                this._generateLink();
                ModalHelper.showModal(this.modalId);
            });
    }
}
