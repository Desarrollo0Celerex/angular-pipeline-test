import { Component, OnInit } from '@angular/core';
import { SmartComponent } from '@core/classes/smart-component';
import { CALENDARS } from '@core/constants/settings';
import { ModalHelper } from '@core/helpers/modal.helper';
import { TaskModalService } from '@features-legacy/tasks/services/task-modal.service';

@Component({
    selector: 'agt-modal-select-calendar',
    templateUrl: './modal-select-calendar.component.html',
    styles: [],
    standalone: false
})
export class ModalSelectCalendarComponent
    extends SmartComponent
    implements OnInit
{
    CALENDARS: any = CALENDARS;
    modalId = 'agt-modal-select-calendar';
    cancelRoute: string | [] = [];
    private _taskId = '';

    constructor(private _taskModalService: TaskModalService) {
        super();
    }

    ngOnInit(): void {
        this._taskModalService.modalSelectCalendar$
            .pipe(this.untilComponentDestroy())
            .subscribe((data) => {
                this._taskId = data.taskId;
                this.cancelRoute = data.cancelRoute;
                ModalHelper.show(this.modalId);
            });
    }

    showModalSyncCalendar(calendarId: number): void {
        this._taskModalService.showModalSyncCalendar({
            taskId: this._taskId,
            calendarId: calendarId,
            cancelRoute: this.cancelRoute,
        });
    }
}
