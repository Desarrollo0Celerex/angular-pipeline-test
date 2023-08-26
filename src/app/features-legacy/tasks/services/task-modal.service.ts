import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { InitModalCreateTask } from '../interfaces/init-modal-create-task.interface';
import { InitModalSyncCalendar } from '../interfaces/init-modal-sync-calendar.interface';
import { InitModalSelectCalendar } from '../interfaces/init-modal-select-caendar.interface';

@Injectable({
    providedIn: 'root',
})
export class TaskModalService {
    public modalCreateTask$ = new Subject<Partial<InitModalCreateTask>>();
    public modalSelectCalendar$ = new Subject<InitModalSelectCalendar>();
    public modalSyncCalendar$ = new Subject<InitModalSyncCalendar>();

    public showModalCreateTask(data: Partial<InitModalCreateTask>): void {
        this.modalCreateTask$.next(data);
    }

    public showModalSelectCalendar(data: InitModalSelectCalendar): void {
        this.modalSelectCalendar$.next(data);
    }

    public showModalSyncCalendar(data: InitModalSyncCalendar): void {
        this.modalSyncCalendar$.next(data);
    }
}
