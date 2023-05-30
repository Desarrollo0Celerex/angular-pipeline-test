import { Injectable } from '@angular/core';
import { TASK_STATUS } from '@core/constants/settings';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class ModuleService {
    currentTaskStatusId$ = new BehaviorSubject<number>(TASK_STATUS.PRIORITY);
    modalCreateTask$ = new Subject<void>();
    reloadContent$ = new Subject<boolean>();

    requestReloadContent(): void {
        this.reloadContent$.next(true);
    }

    setTaskStatusId(taskStatusId: number): void {
        this.currentTaskStatusId$.next(taskStatusId);
    }

    showModalCreateTask(): void {
        this.modalCreateTask$.next();
    }
}
