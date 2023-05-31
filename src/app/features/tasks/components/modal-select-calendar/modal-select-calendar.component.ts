import { Component, OnInit } from '@angular/core';
import { SmartComponent } from '@core/classes/smart-component';
import { CALENDARS } from '@core/constants/settings';
import { InitModalSelectCalendar } from '@features/tasks/interfaces/init-modal-select-calendar.interface';
import { TaskModalService } from '@features/tasks/services/task-modal.service';
declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-select-calendar',
    templateUrl: './modal-select-calendar.component.html',
    styles: [],
})
export class ModalSelectCalendarComponent
    extends SmartComponent
    implements OnInit
{
    CALENDARS: any = CALENDARS;
    modalId = 'agt-modal-select-calendar';
    private _data: InitModalSelectCalendar | undefined = undefined;

    constructor(private _taskModalService: TaskModalService) {
        super();
    }

    ngOnInit(): void {
        this._taskModalService.modalSelectCalendar$
            .pipe(this.untilComponentDestroy())
            .subscribe((data) => {
                this._data = data;
                this._showModal();
            });
    }

    showModalSyncCalendar(calendarId: number): void {
        this._taskModalService.showModalSyncCalendar({
            ...this._data!,
            calendarId: calendarId,
        });
    }

    private _showModal() {
        ModalPlugin.show(this.modalId);
    }
}
