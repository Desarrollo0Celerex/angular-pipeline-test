import { Component, OnInit } from '@angular/core';
import { SmartComponent } from '@core/classes/smart-component';
import { ModalHelper } from '@core/helpers/modal.helper';
import { ModuleService } from '@features-legacy/tasks/services/module.service';
import { TaskService } from '@features-legacy/tasks/services/task.service';
import { Task } from '@features-legacy/tasks/interfaces/task.interface';
import moment from 'moment';

@Component({
    selector: 'agt-modal-show-task',
    templateUrl: './modal-show-task.component.html',
    styles: [],
})
export class ModalShowTaskComponent extends SmartComponent implements OnInit {
    modalId = 'agt-modal-show-task';
    task: Task | undefined = undefined;
    private _taskId = '';

    constructor(
        private _moduleService: ModuleService,
        private _taskService: TaskService
    ) {
        super();
    }

    ngOnInit(): void {
        this._moduleService.modalShowTask$
            .pipe(this.untilComponentDestroy())
            .subscribe((taskId) => {
                this._taskId = taskId;
                this._loadTask();
            });
    }

    get canShowAlert(): boolean {
        return this.taskDaysLate > 3 ? true : false;
    }

    get taskDaysLate(): number {
        return this.task ? moment().diff(this.task.taskDate, 'days') : 0;
    }

    get responsibleName(): string {
        return this.task && this.task.responsibleName
            ? this.task.responsibleName
            : 'Sin asignar';
    }

    get taskDatetime(): string {
        return this.task ? this.task.taskDate + ' ' + this.task.taskTime : '';
    }

    private _loadTask(): void {
        const fields =
            'taskTitle,taskDetails,taskProgressStatusName,responsibleName,taskDate,taskTime';
        this._taskService.getTask(this._taskId, fields).subscribe((task) => {
            this.task = task;
            ModalHelper.show(this.modalId);
        });
    }
}
