import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { InitModalCreateTask } from '../interfaces/init-modal-create-task.interface';
import { InitModalSyncCalendar } from '../interfaces/init-modal-sync-calendar.interface';

@Injectable({
    providedIn: 'root',
})
export class TaskModalService {
    public modalCreateTask$ = new Subject<Partial<InitModalCreateTask>>();
    public modalSelectCalendar$ = new Subject<string>();
    public modalSyncCalendar$ = new Subject<InitModalSyncCalendar>();

    public showModalCreateTask(data: Partial<InitModalCreateTask>): void {
        this.modalCreateTask$.next(data);
    }

    public showModalSelectCalendar(taskId: string): void {
        this.modalSelectCalendar$.next(taskId);
    }

    public showModalSyncCalendar(data: InitModalSyncCalendar): void {
        this.modalSyncCalendar$.next(data);
    }
}
