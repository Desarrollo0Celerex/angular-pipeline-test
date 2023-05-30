import { Component } from '@angular/core';
declare var ModalPlugin: any;
import { TasksService } from '../../tasks.service';
import { AlertHelper } from '@core/helpers/alert.helper';
//import { TaskModalService } from '@core/services/task/task-modal.service';

@Component({
    selector: 'agt-main-action',
    templateUrl: './main-action.component.html',
    styles: [],
})
export class MainActionComponent {
    modalIdSelectTaskAction = 'agt-moda-select-task';
    modalIdCreateTaskAction = 'agt-moda-create-task';

    constructor(
        private _tasksService: TasksService
    ) //private _taskModalService: TaskModalService
    {}

    reloadContent(): void {
        AlertHelper.taskCreated();
        this._tasksService.reloadContent();
    }

    showModalToSelectTaskAction(): void {
        //this._taskModalService.showModalCreateTask();
        //ModalPlugin.show(this.modalIdSelectTaskAction);
    }

    showModalToCreateTask(): void {
        ModalPlugin.show(this.modalIdCreateTaskAction);
    }
}
