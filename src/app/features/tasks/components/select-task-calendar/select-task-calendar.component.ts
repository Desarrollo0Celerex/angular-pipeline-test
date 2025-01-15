import { Component, ViewChild } from '@angular/core';
import { CALENDARS } from '@core/constants/settings';
import { ModalHelper } from '@core/helpers/modal.helper';
import { SelectTaskCalendar } from '@tasks/interfaces/select-task-calendar.interface';
import { SynchronizeTaskComponent } from '../synchronize-task/synchronize-task.component';

@Component({
    selector: 'agt-select-task-calendar',
    templateUrl: './select-task-calendar.component.html',
    styles: [],
    standalone: false
})
export class SelectTaskCalendarComponent {
    @ViewChild(SynchronizeTaskComponent)
    synchronizeTaskComponent!: SynchronizeTaskComponent;
    CALENDARS = CALENDARS;
    data: SelectTaskCalendar | undefined = undefined;
    modalId = 'agt-modal-select-task-calendar';

    init(data: SelectTaskCalendar): void {
        this.data = data;
        ModalHelper.show(this.modalId);
    }

    reset(): void {
        this.data = undefined;
    }

    selectCalendar(calendarId: number): void {
        ModalHelper.hide(this.modalId);
        this.synchronizeTaskComponent.init({
            taskId: this.data!.taskId,
            calendarId,
            cancelRoute: this.data!.cancelRoute,
        });
    }
}
