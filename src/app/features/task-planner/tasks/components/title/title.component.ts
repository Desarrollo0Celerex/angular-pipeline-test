import { Component, OnInit } from '@angular/core';
import { SmartComponent } from '@core/classes/smart-component';
import { TasksService } from '../../tasks.service';

@Component({
    selector: 'agt-title',
    templateUrl: './title.component.html',
    styles: [],
})
export class TitleComponent extends SmartComponent implements OnInit {
    taskStatusId: number = 0;

    constructor(private _tasksService: TasksService) {
        super();
    }

    ngOnInit(): void {
        this._tasksService.taskStatusId
            .pipe(this.untilComponentDestroy())
            .subscribe((taskStatusId) => {
                this.taskStatusId = taskStatusId;
            });
    }
}
