import { Injectable } from '@angular/core';
import { TASK_STATUS } from '@core/constants/settings';
import { BehaviorSubject, Subject } from 'rxjs';
import { InitModalEditTask } from '../interfaces/init-modal-edit-task.interface';
import { InitModalSelectCalendar } from '../interfaces/init-modal-select-calendar.interface';
import { InitModalShowTask } from '../interfaces/init-modal-show-task.interface';

@Injectable()
export class ModuleService {
    currentTaskStatusId$ = new BehaviorSubject<number>(TASK_STATUS.PRIORITY);
    modalSelectTaskAction$ = new Subject<void>();
    modalEditTask$ = new Subject<InitModalEditTask>();
    modalHandleTask$ = new Subject<InitModalSelectCalendar>();
    modalShowTask$ = new Subject<string>();
    reloadContent$ = new Subject<boolean>();

    requestReloadContent(): void {
        this.reloadContent$.next(true);
    }

    setTaskStatusId(taskStatusId: number): void {
        this.currentTaskStatusId$.next(taskStatusId);
    }

    showModalSelectTaskAction(): void {
        this.modalSelectTaskAction$.next();
    }

    showModalEditTask(data: InitModalEditTask): void {
        this.modalEditTask$.next(data);
    }

    showModalHandleTask(data: InitModalSelectCalendar): void {
        this.modalHandleTask$.next(data);
    }

    showModalShowTask(taskId: string): void {
        this.modalShowTask$.next(taskId);
    }
}
