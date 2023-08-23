import { Component, OnInit } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';

import { SmartComponent } from '@core/classes/smart-component';
import { TASK_STATUS } from '@core/constants/settings';
import { UtilitiesHelper } from '@core/helpers/utilities.helper';
import { Kpi } from '@core/interfaces/kpi.interface';
import { TaskService } from '@features-legacy/tasks/services/task.service';

import { TaskStatusBackgroundPipe } from '../../pipes/task-status-background.pipe';
import { TaskStatusIconPipe } from '../../pipes/task-status-icon.pipe';
import { TaskStatusNamePipe } from '../../pipes/task-status-name.pipe';

import { ModuleService } from '../../services/module.service';
import { TASKS_ROUTES } from '@core/constants/routes';

declare var CounterPlugin: any;

@Component({
    selector: 'agt-tasks-kpis',
    templateUrl: './tasks-kpis.component.html',
    styles: [],
})
export class TasksKpisComponent extends SmartComponent implements OnInit {
    private _taskStatusIds = [
        TASK_STATUS.PRIORITY,
        TASK_STATUS.DELAYED,
        TASK_STATUS.URGENT,
        TASK_STATUS.EXPIRED,
    ];
    kpis: Kpi[] = this._initKpis();
    selectedTaskStatusId: number = 0;

    constructor(
        private _taskService: TaskService,
        private _taskStatusBackgroundPipe: TaskStatusBackgroundPipe,
        private _taskStatusIconPipe: TaskStatusIconPipe,
        private _taskStatusNamePipe: TaskStatusNamePipe,
        private _moduleService: ModuleService
    ) {
        super();
    }

    ngOnInit(): void {
        this._loadKpis();
        this._moduleService.currentTaskStatusId$
            .pipe(this.untilComponentDestroy())
            .subscribe((taskStatusId) => {
                this.selectedTaskStatusId = taskStatusId;
            });
        this._moduleService.reloadContent$
            .pipe(this.untilComponentDestroy())
            .subscribe(() => {
                this.kpis = this._initKpis();
                this._loadKpis();
            });
    }

    selectTaskStatusId(contectSubtype: number): void {
        this._moduleService.setTaskStatusId(contectSubtype);
    }

    private _initKpis(): Kpi[] {
        const kpis: Kpi[] = [];
        for (let taskStatusId of this._taskStatusIds) {
            kpis.push({
                contentTypeName: 'Tareas',
                contentSubtype: taskStatusId,
                contentSubtypeName:
                    this._taskStatusNamePipe.transform(taskStatusId),
                contentSubtypeBackground:
                    this._taskStatusBackgroundPipe.transform(taskStatusId),
                contentSubtypeIcon:
                    this._taskStatusIconPipe.transform(taskStatusId),
                route: `/${TASKS_ROUTES.MODULE}/${TASKS_ROUTES.TASKS}`,
                value: 0,
                total: 0,
            });
        }
        return kpis;
    }

    private _loadKpis(): void {
        this._taskService
            .getTotalWorkspaceTasks()
            .pipe(this.untilComponentDestroy())
            .subscribe((total: number) => {
                this._generateRequests()
                    .pipe(this.untilComponentDestroy())
                    .subscribe((totalsByStatus: number[]) => {
                        this._loadData(total, totalsByStatus);
                        CounterPlugin.countUp();
                    });
            });
    }

    private _generateRequest(taskStatusId: number): Observable<number> {
        const filters: string = UtilitiesHelper.generateHttpFilter(
            'taskStatusId',
            [taskStatusId]
        );
        return this._taskService.getTotalWorkspaceTasks(filters);
    }

    private _generateRequests(): Observable<number[]> {
        let requests: Observable<number>[] = [];
        for (let taskStatusId of this._taskStatusIds) {
            requests.push(this._generateRequest(taskStatusId));
        }
        return forkJoin(requests);
    }

    private _loadData(total: number, totalsByStatus: number[]): void {
        for (let index in totalsByStatus) {
            this.kpis[index].value = totalsByStatus[index];
            this.kpis[index].total = total;
        }
    }
}
