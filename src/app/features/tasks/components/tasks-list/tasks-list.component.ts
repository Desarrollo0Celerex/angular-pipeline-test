import { Component, OnInit } from '@angular/core';
import { SmartComponent } from '@core/classes/smart-component';
import { UtilitiesHelper } from '@core/helpers/utilities.helper';
import { HttpResponseItems } from '@core/interfaces/http-response-items.interface';
import { TaskService } from '@features/tasks/services/task.service';
import { ModuleService } from '../../services/module.service';
import { Task } from '@features/tasks/interfaces/task.interface';

@Component({
    selector: 'agt-tasks-list',
    templateUrl: './tasks-list.component.html',
    styles: [],
})
export class TasksListComponent extends SmartComponent implements OnInit {
    isLoadedContent: boolean = false;
    isLoadingContent: boolean = false;
    taskStatusId: number = 0;
    tasks: Task[] = [];
    page: number = 1;
    perPage: number = 12;
    totalItems: number = 0;

    constructor(
        private _taskService: TaskService,
        private _moduleService: ModuleService
    ) {
        super();
    }

    ngOnInit(): void {
        this._moduleService.currentTaskStatusId$
            .pipe(this.untilComponentDestroy())
            .subscribe((taskStatusId: number) => {
                this.taskStatusId = taskStatusId;
                this.initData();
            });
        this._moduleService.reloadContent$
            .pipe(this.untilComponentDestroy())
            .subscribe((canReloadContent: boolean) => {
                if (canReloadContent) {
                    this.initData();
                }
            });
    }

    initData(): void {
        this.page = 1;
        this.tasks = [];
        this.isLoadedContent = false;
        this._loadTasks();
    }

    loadMoreContents(): void {
        this.page++;
        this._loadTasks();
    }

    showModalToSelectTaskAction(): void {
        console.log('Realizar acción');
    }

    trackById(index: number, task: Task): string {
        return task.taskId;
    }

    private _loadTasks(): void {
        this.isLoadingContent = true;
        const fields: string =
            'taskId,taskNumber,taskDate,taskTime,taskDetails,taskStatusId,taskTypeName,taskModuleName,taskTitle,taskProgressStatusId,responsibleId';
        const filter: string = UtilitiesHelper.generateHttpFilter(
            'taskStatusId',
            [this.taskStatusId]
        );
        const sortBy: string = 'taskDate,taskTime,taskNumber';
        this._taskService
            .getWorkspaceTasks(this.page, this.perPage, fields, filter, sortBy)
            .pipe(this.untilComponentDestroy())
            .subscribe((res: HttpResponseItems) => {
                this.tasks = this.tasks.concat(res.items);
                this.totalItems = res.totalItems;
                this.isLoadingContent = false;
                this.isLoadedContent = true;
            });
    }
}
