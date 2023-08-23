import { Injectable } from '@angular/core';
import { TASK_STATUS } from '@core/constants/settings';
import { BehaviorSubject, Subject } from 'rxjs';
import { InitModalRequestContactInformationToShareTask } from '../interfaces/init-modal-request-contact-information-to-share-task.interface';
import * as moment from 'moment';
import { CalendarRange } from '@core/interfaces/calendar-range.interface';

@Injectable()
export class ModuleService {
    currentTaskStatusId$ = new BehaviorSubject<number>(TASK_STATUS.PRIORITY);
    calendarRange$ = new BehaviorSubject<CalendarRange>({
        start: moment().format('YYYY-MM-DD'),
        end: moment().format('YYYY-MM-DD'),
    });
    calendarFilter$ = new Subject<string>();
    modalConfirmDeleteTask$ = new Subject<string>();
    modalEditTask$ = new Subject<string>();
    modalHandleTask$ = new Subject<string>();
    modalRequestContactInformation$ =
        new Subject<InitModalRequestContactInformationToShareTask>();
    modalSelectChannels$ = new Subject<string>();
    modalSelectTaskAction$ = new Subject<void>();
    modalShowTask$ = new Subject<string>();
    query$ = new BehaviorSubject<string>('');
    reloadContent$ = new Subject<void>();
    totalResults$: BehaviorSubject<number> = new BehaviorSubject<number>(-1);

    changeCalendarRange(range: CalendarRange): void {
        this.calendarRange$.next(range);
    }

    changeCalendarFilter(filter: string): void {
        this.calendarFilter$.next(filter);
    }

    changeQuery(query: string): void {
        this.query$.next(query);
    }

    changeTotalResults(totalResults: number): void {
        this.totalResults$.next(totalResults);
    }

    requestReloadContent(): void {
        this.reloadContent$.next();
    }

    setTaskStatusId(taskStatusId: number): void {
        this.currentTaskStatusId$.next(taskStatusId);
    }

    showModalConfirmDeleteTask(taskId: string): void {
        this.modalConfirmDeleteTask$.next(taskId);
    }

    showModalEditTask(taskId: string): void {
        this.modalEditTask$.next(taskId);
    }

    showModalHandleTask(taskId: string): void {
        this.modalHandleTask$.next(taskId);
    }

    showModalRequestContactInformationToShareTask(
        data: InitModalRequestContactInformationToShareTask
    ): void {
        this.modalRequestContactInformation$.next(data);
    }

    showModalSelectChannels(taskId: string): void {
        this.modalSelectChannels$.next(taskId);
    }

    showModalSelectTaskAction(): void {
        this.modalSelectTaskAction$.next();
    }

    showModalShowTask(taskId: string): void {
        this.modalShowTask$.next(taskId);
    }
}
