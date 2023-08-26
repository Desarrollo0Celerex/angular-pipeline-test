import { Component, Input } from '@angular/core';
import { Task } from '@features-legacy/tasks/interfaces/task.interface';
import { ModuleService } from '@features-legacy/tasks/services/module.service';
import * as moment from 'moment';

@Component({
    selector: 'agt-task',
    templateUrl: './task.component.html',
    styles: [],
})
export class TaskComponent {
    @Input() task: Task | undefined = undefined;

    constructor(private _moduleService: ModuleService) {}

    get taskTime(): string {
        return this.task ? `${this.task.taskDate} ${this.task.taskTime}` : '';
    }

    showModalConfirmDeleteTask(): void {
        this._moduleService.showModalConfirmDeleteTask(this.task!.taskId);
    }

    showModalEditTask(): void {
        this._moduleService.showModalEditTask(this.task!.taskId);
    }

    showModalShowTask(): void {
        this._moduleService.showModalShowTask(this.task!.taskId);
    }

    showModalHandleTask(): void {
        this._moduleService.showModalHandleTask(this.task!.taskId);
    }
}
