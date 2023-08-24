import { Component } from '@angular/core';
import { CALENDARS } from '@core/constants/settings';
import { ModalHelper } from '@core/helpers/modal.helper';
import { UtilitiesHelper } from '@core/helpers/utilities.helper';
import { environment } from '@env/environment';
import { SynchronizeTask } from '@tasks/interfaces/synchronize-task.interface';
import { Task } from '@tasks/interfaces/task.interface';
import { TaskService } from '@tasks/services/task.service';
import * as moment from 'moment';

@Component({
    selector: 'agt-synchronize-task',
    templateUrl: './synchronize-task.component.html',
    styles: [],
})
export class SynchronizeTaskComponent {
    data: SynchronizeTask | undefined = undefined;
    eventLink = '';
    modalId = 'agt-modal-synchronize-task';

    constructor(private _taskService: TaskService) {}

    goToCalendarEvent(): void {
        UtilitiesHelper.executeLink(this.eventLink);
        this.reset();
    }

    init(data: SynchronizeTask): void {
        this.data = data;
        ModalHelper.show(this.modalId);
        this._loadTask(this.data.taskId);
    }

    reset(): void {
        this.data = undefined;
    }

    private _generateLink(task: Task): void {
        switch (this.data!.calendarId) {
            case CALENDARS.GOOGLE:
                this.eventLink = this._generateGoogleLink(task);
                break;

            case CALENDARS.OUTLOOK:
                this.eventLink = this._generateOutlookLink(task);
                break;

            default:
                this.eventLink = '';
                break;
        }
    }

    private _generateGoogleLink(task: Task): string {
        const startDatetime = moment(
            task!.taskDate + ' ' + task!.taskTime,
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
        link += 'details=' + encodeURIComponent(task!.taskDetails);
        link += '&';
        link += 'text=' + task!.taskTitle;
        return link;
    }

    private _generateOutlookLink(task: Task): string {
        const startDatetime = moment(
            task!.taskDate + ' ' + task!.taskTime,
            'YYYY/MM/DD h:mm A'
        );
        const startDatetimeStr = startDatetime.format('YYYY-MM-DDTHH:mm:ss');
        const endDatetimeStr = startDatetime
            .add(15, 'minutes')
            .format('YYYY-MM-DDTHH:mm:ss');
        let link = 'https://outlook.live.com/calendar/0/deeplink/compose?';
        link += 'body=' + encodeURIComponent(task!.taskDetails);
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
        link += 'subject=' + task!.taskTitle;
        return link;
    }

    private _loadTask(taskId: string): void {
        const fields = 'taskTitle,taskDetails,taskDate,taskTime';
        this._taskService.getWorkspaceTask(taskId, fields).subscribe((task) => {
            this._generateLink(task);
        });
    }
}
