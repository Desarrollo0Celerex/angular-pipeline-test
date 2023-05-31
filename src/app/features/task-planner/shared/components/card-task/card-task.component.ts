import { Component, Input } from '@angular/core';
import { Task } from '@features/task-planner/interfaces/task.interface';

@Component({
    selector: 'agt-card-task',
    templateUrl: './card-task.component.html',
    styles: [],
})
export class CardTaskComponent {
    @Input() task: Task | undefined;

    get taskTime(): string {
        return this.task ? `${this.task.taskDate} ${this.task.taskTime}` : '';
    }
}
