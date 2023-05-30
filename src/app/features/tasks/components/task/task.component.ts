import { Component, Input } from '@angular/core';
import { Task } from '@features/task-planner/interfaces/task.interface';

@Component({
    selector: 'agt-task',
    templateUrl: './task.component.html',
    styles: [],
})
export class TaskComponent {
    @Input() task: Task | undefined = undefined;

    get taskTime(): string {
        return this.task ? `${this.task.taskDate} ${this.task.taskTime}` : '';
    }
}
