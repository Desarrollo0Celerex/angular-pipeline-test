import { Component, OnInit } from '@angular/core';
import { TASK_STATUS } from '@core/constants/settings';
import { ModuleService } from '@features-legacy/tasks/services/module.service';

@Component({
    selector: 'agt-tasks',
    templateUrl: './tasks.page.html',
    styles: [],
    standalone: false
})
export class TasksPage implements OnInit {
    constructor(private _moduleService: ModuleService) {}

    ngOnInit(): void {
        this._moduleService.setTaskStatusId(TASK_STATUS.PRIORITY);
    }
}
