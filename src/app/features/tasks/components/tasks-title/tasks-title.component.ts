import { Component, OnInit } from '@angular/core';
import { SmartComponent } from '@core/classes/smart-component';
import { ModuleService } from '@features/tasks/services/module.service';

@Component({
    selector: 'agt-tasks-title',
    templateUrl: './tasks-title.component.html',
    styles: [],
})
export class TasksTitleComponent extends SmartComponent implements OnInit {
    taskStatusId: number = 0;

    constructor(private _moduleService: ModuleService) {
        super();
    }

    ngOnInit(): void {
        this._moduleService.currentTaskStatusId$
            .pipe(this.untilComponentDestroy())
            .subscribe((taskStatusId) => {
                this.taskStatusId = taskStatusId;
            });
    }
}
