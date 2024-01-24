import { Injectable } from '@angular/core';
import { CreateTask } from '@tasks/interfaces/create-task.interface';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CreateTaskService {
    createTaskModal$ = new Subject<CreateTask>();
    patchTask$ = new Subject<{
        subject: string;
        details: string;
    }>();

    openModal(data: CreateTask): void {
        this.createTaskModal$.next(data);
    }

    patchTask(data: { subject: string; details: string }): void {
        this.patchTask$.next(data);
    }
}
