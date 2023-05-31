import { Component } from '@angular/core';
import { ModuleService } from '@features/tasks/services/module.service';

@Component({
    selector: 'agt-tasks-main-action',
    templateUrl: './tasks-main-action.component.html',
    styles: [],
})
export class TasksMainActionComponent {
    constructor(private _moduleService: ModuleService) {}

    showModalToSelectTaskAction(): void {
        this._moduleService.showModalCreateTask();
    }
}
