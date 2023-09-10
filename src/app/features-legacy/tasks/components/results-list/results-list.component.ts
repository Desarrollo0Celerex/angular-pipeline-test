import { Component, OnInit, ViewChild } from '@angular/core';
import { SmartComponent } from '@core/classes/smart-component';
import { UtilitiesHelper } from '@core/helpers/utilities.helper';
import { HttpResponseItems } from '@core/interfaces/http-response-items.interface';
import { TaskService } from '@features-legacy/tasks/services/task.service';
import { ModuleService } from '../../services/module.service';
import { Task } from '@features-legacy/tasks/interfaces/task.interface';
import { TaskModalService } from '@features-legacy/tasks/services/task-modal.service';
import { GENDERS, TASK_MODULES } from '@core/constants/settings';
import { WorkspaceUserService } from '@core/services/workspace-user/workspace-user.service';
import * as moment from 'moment';
import { CreateTaskComponent } from '@tasks/components/create-task/create-task.component';

@Component({
    selector: 'agt-results-list',
    templateUrl: './results-list.component.html',
    styles: [],
})
export class ResultsListComponent extends SmartComponent implements OnInit {
    @ViewChild(CreateTaskComponent)
    createTaskComponent!: CreateTaskComponent;
    contentGender = GENDERS.FEMALE;
    isLoadedContent: boolean = false;
    isLoadingContent: boolean = false;
    taskStatusId: number = 0;
    tasks: Task[] = [];
    page: number = 1;
    perPage: number = 12;
    query: string = '';
    totalItems: number = 0;
    rangeStart = '';
    rangeEnd = '';

    constructor(
        private _taskService: TaskService,
        private _taskModalService: TaskModalService,
        private _moduleService: ModuleService,
        private _workspaceUserService: WorkspaceUserService
    ) {
        super();
    }

    ngOnInit(): void {
        this._moduleService.query$
            .pipe(this.untilComponentDestroy())
            .subscribe((query) => {
                this.query = query;
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
        this.createTaskComponent.init({
            title: 'Programar Tarea',
            message: 'Ingresa los detalles para programar la tarea. ',
            buttonLabel: '📆 PROGRAMAR TAREA',
            cancelRoute: [],
            taskModuleId: TASK_MODULES.OTHER,
        });
        const subject = '📌 Seguimiento de Tarea';
        const details = '🎯 Seguimiento de tarea para ...';
        this.createTaskComponent.patchTaskValues(subject, details);
    }

    trackById(index: number, task: Task): string {
        return task.taskId;
    }

    private _loadTasks(): void {
        this.isLoadingContent = true;
        const fields =
            'taskId,taskNumber,taskDate,taskTime,taskDetails,taskStatusId,taskTypeName,taskModuleName,taskTitle,taskProgressStatusId,responsibleId';
        const filter = '';
        const search: string = `taskDetails:${this.query}`;
        // Send value (-1) to hide the results in the search engine while the new search is loading.
        this._moduleService.changeTotalResults(-1);
        const sortBy: string = 'taskDate,taskTime,taskNumber';
        this._taskService
            .getWorkspaceTasks(
                this.page,
                this.perPage,
                fields,
                filter,
                sortBy,
                search
            )
            .pipe(this.untilComponentDestroy())
            .subscribe((res: HttpResponseItems) => {
                this.tasks = this.tasks.concat(res.items);
                this.totalItems = res.totalItems;
                this.isLoadingContent = false;
                this.isLoadedContent = true;
                this._moduleService.changeTotalResults(res.totalItems);
            });
    }
}
