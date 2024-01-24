import { Component, OnInit, ViewChild } from '@angular/core';
import { SmartComponent } from '@core/classes/smart-component';
import { UtilitiesHelper } from '@core/helpers/utilities.helper';
import { HttpResponseItems } from '@core/interfaces/http-response-items.interface';
import { TaskService } from '@features-legacy/tasks/services/task.service';
import { ModuleService } from '../../services/module.service';
import { Task } from '@features-legacy/tasks/interfaces/task.interface';
import { TaskModalService } from '@features-legacy/tasks/services/task-modal.service';
import { TASK_MODULES } from '@core/constants/settings';
import { WorkspaceUserService } from '@core/services/workspace-user/workspace-user.service';
import { CreateTaskComponent } from '@tasks/components/create-task/create-task.component';
import { CreateTaskService } from '@tasks/components/create-task/create-task.service';

@Component({
    selector: 'agt-tasks-list',
    templateUrl: './tasks-list.component.html',
    styles: [],
})
export class TasksListComponent extends SmartComponent implements OnInit {
    @ViewChild(CreateTaskComponent)
    createTaskComponent!: CreateTaskComponent;
    isLoadedContent: boolean = false;
    isLoadingContent: boolean = false;
    taskStatusId: number = 0;
    tasks: Task[] = [];
    page: number = 1;
    perPage: number = 12;
    totalItems: number = 0;

    constructor(
        private _taskService: TaskService,
        private _createTaskService: CreateTaskService,
        private _taskModalService: TaskModalService,
        private _moduleService: ModuleService,
        private _workspaceUserService: WorkspaceUserService
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
            .subscribe(() => {
                this.initData();
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

    showModalCreateTask(): void {
        this._createTaskService.openModal({
            title: 'Programar Tarea',
            message: 'Ingresa los detalles para programar la tarea. ',
            buttonLabel: '📆 PROGRAMAR TAREA',
            cancelRoute: [],
            taskModuleId: TASK_MODULES.OTHER,
        });
        const subject = '📌 Seguimiento de Tarea';
        const details = '🎯 Seguimiento de tarea para ...';
        this._createTaskService.patchTask({ subject, details });
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
