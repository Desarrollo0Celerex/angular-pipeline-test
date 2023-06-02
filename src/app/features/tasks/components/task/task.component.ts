import { Component, Input } from '@angular/core';
import { Task } from '@features/tasks/interfaces/task.interface';
import { ModuleService } from '@features/tasks/services/module.service';
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
        this._moduleService.showModalHandleTask({
            taskTitle: this.task!.taskTitle,
            taskDate: moment(this.task!.taskDate).format('DD/MM/YYYY'),
            taskTime: moment(
                this.task!.taskDate + ' ' + this.task!.taskTime
            ).format('h:mm A'),
            taskDetails: this.task!.taskDetails,
        });
    }
}
