import { Component, OnInit } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';

import { SmartComponent } from '@core/classes/smart-component';
import { TASK_STATUS } from '@core/constants/settings';
import { UtilitiesHelper } from '@core/helpers/utilities.helper';
import { Kpi } from '@core/interfaces/kpi.interface';
import { TaskService } from '@features/tasks/services/task.service';

import { TaskStatusBackgroundPipe } from '../../../shared/pipes/task-status-background.pipe';
import { TaskStatusIconPipe } from '../../../shared/pipes/task-status-icon.pipe';
import { TaskStatusNamePipe } from '../../../shared/pipes/task-status-name.pipe';

import { TasksService } from '../../tasks.service';

declare var CounterPlugin: any;

@Component({
    selector: 'agt-kpis',
    templateUrl: './kpis.component.html',
    styles: [],
})
export class KpisComponent extends SmartComponent {
    kpis: Kpi[] = this._initKpis();
    selectedTaskStatusId: number = 0;

    constructor(
        private _taskService: TaskService,
        private _taskStatusBackgroundPipe: TaskStatusBackgroundPipe,
        private _taskStatusIconPipe: TaskStatusIconPipe,
        private _taskStatusNamePipe: TaskStatusNamePipe,
        private _tasksService: TasksService
    ) {
        super();
    }

    ngOnInit(): void {
        this._loadKpis();
        this._tasksService.taskStatusId
            .pipe(this.untilComponentDestroy())
            .subscribe((taskStatusId) => {
                this.selectedTaskStatusId = taskStatusId;
            });
        this._tasksService.canReloadContent
            .pipe(this.untilComponentDestroy())
            .subscribe((canReloadContent) => {
                if (canReloadContent) {
                    this.kpis = this._initKpis();
                    this._loadKpis();
                }
            });
    }

    selectTaskStatusId(contectSubtype: number): void {
        this._tasksService.setTaskStatusId(contectSubtype);
    }

    private _initKpis(): Kpi[] {
        return [
            {
                contentTypeName: 'Tareas',
                contentSubtype: TASK_STATUS.PRIORITY,
                contentSubtypeName: this._taskStatusNamePipe.transform(
                    TASK_STATUS.PRIORITY
                ),
                contentSubtypeBackground:
                    this._taskStatusBackgroundPipe.transform(
                        TASK_STATUS.PRIORITY
                    ),
                contentSubtypeIcon: this._taskStatusIconPipe.transform(
                    TASK_STATUS.PRIORITY
                ),
                route: '',
                value: 0,
                total: 0,
            },
            {
                contentTypeName: 'Tareas',
                contentSubtype: TASK_STATUS.DELAYED,
                contentSubtypeName: this._taskStatusNamePipe.transform(
                    TASK_STATUS.DELAYED
                ),
                contentSubtypeBackground:
                    this._taskStatusBackgroundPipe.transform(
                        TASK_STATUS.DELAYED
                    ),
                contentSubtypeIcon: this._taskStatusIconPipe.transform(
                    TASK_STATUS.DELAYED
                ),
                route: '',
                value: 0,
                total: 0,
            },
            {
                contentTypeName: 'Tareas',
                contentSubtype: TASK_STATUS.URGENT,
                contentSubtypeName: this._taskStatusNamePipe.transform(
                    TASK_STATUS.URGENT
                ),
                contentSubtypeBackground:
                    this._taskStatusBackgroundPipe.transform(
                        TASK_STATUS.URGENT
                    ),
                contentSubtypeIcon: this._taskStatusIconPipe.transform(
                    TASK_STATUS.URGENT
                ),
                route: '',
                value: 0,
                total: 0,
            },
            {
                contentTypeName: 'Tareas',
                contentSubtype: TASK_STATUS.EXPIRED,
                contentSubtypeName: this._taskStatusNamePipe.transform(
                    TASK_STATUS.EXPIRED
                ),
                contentSubtypeBackground:
                    this._taskStatusBackgroundPipe.transform(
                        TASK_STATUS.EXPIRED
                    ),
                contentSubtypeIcon: this._taskStatusIconPipe.transform(
                    TASK_STATUS.EXPIRED
                ),
                route: '',
                value: 0,
                total: 0,
            },
        ];
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
        for (let kpi of this.kpis) {
            requests.push(this._generateRequest(kpi.contentSubtype));
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
