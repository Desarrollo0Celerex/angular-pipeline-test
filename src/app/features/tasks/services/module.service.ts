import { Injectable } from '@angular/core';
import { TASK_STATUS } from '@core/constants/settings';
import { BehaviorSubject, Subject } from 'rxjs';
import { InitModalSelectCalendar } from '../interfaces/init-modal-select-calendar.interface';

@Injectable()
export class ModuleService {
    currentTaskStatusId$ = new BehaviorSubject<number>(TASK_STATUS.PRIORITY);
    modalConfirmDeleteTask$ = new Subject<string>();
    modalEditTask$ = new Subject<string>();
    modalHandleTask$ = new Subject<InitModalSelectCalendar>();
    modalSelectTaskAction$ = new Subject<void>();
    modalShowTask$ = new Subject<string>();
    reloadContent$ = new Subject<boolean>();

    requestReloadContent(): void {
        this.reloadContent$.next(true);
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

    showModalHandleTask(data: InitModalSelectCalendar): void {
        this.modalHandleTask$.next(data);
    }

    showModalSelectTaskAction(): void {
        this.modalSelectTaskAction$.next();
    }

    showModalShowTask(taskId: string): void {
        this.modalShowTask$.next(taskId);
    }
}
