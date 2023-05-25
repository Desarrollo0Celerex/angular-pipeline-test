import { Injectable } from '@angular/core';
import { TASK_STATUS } from '@configs/constants.config';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class TasksService {
    taskStatusId = new BehaviorSubject<number>(TASK_STATUS.PRIORITY);
    canReloadContent = new BehaviorSubject<boolean>(false);

    reloadContent(): void {
        this.canReloadContent.next(true);
    }

    setTaskStatusId(taskStatusId: number): void {
        this.taskStatusId.next(taskStatusId);
    }
}
