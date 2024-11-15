import { Injectable } from '@angular/core';
import { TASK_ENDPOINTS } from '@core/constants/endpoints';
import { ApiHttp } from '@core/http/api.http';
import { CreateTask } from '@features-legacy/tasks/interfaces/create-task.interface';
import { Task } from '@features-legacy/tasks/interfaces/task.interface';
import { Observable } from 'rxjs';
import { AuthService } from '@features-legacy/auth/services/auth.service';
import { HttpResponseItems } from '@core/interfaces/http-response-items.interface';
import { UpdateTask } from '../interfaces/update-task.interface';
import { SendTaskNotfication } from '../interfaces/send-task-notification.interface';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class TaskService {
    private _workspaceId: string = this._authService.workspaceId;

    constructor(
        private _apiHttp: ApiHttp,
        private _authService: AuthService,
        private _httpClient: HttpClient
    ) {}

    createTask(requestBody: CreateTask): Observable<Task> {
        return this._apiHttp.post(
            TASK_ENDPOINTS.workspaceTasks(this._workspaceId),
            requestBody
        );
    }

    deleteTask(taskId: string = ''): Observable<Task> {
        return this._apiHttp.delete(
            TASK_ENDPOINTS.workspaceTask(this._workspaceId, taskId)
        );
    }

    downloadInProgressTasksReport(
        filter: string = '',
        rangeField: string = '',
        rangeStart: string = '',
        rangeEnd: string = '',
        sortBy: string = '-createdAt',
        specialFilter: string = '',
        formatType: number
    ) {
        const route: string = TASK_ENDPOINTS.reportInProgressTasks(
            this._workspaceId
        );
        let params: HttpParams = new HttpParams();
        if (!!filter) params = params.append('filter', filter);
        if (!!rangeField) params = params.append('rangeField', rangeField);
        if (!!rangeStart) params = params.append('rangeStart', rangeStart);
        if (!!rangeEnd) params = params.append('rangeEnd', rangeEnd);
        if (!!formatType) params = params.append('formatType', formatType);
        if (!!sortBy) params = params.append('sortBy', sortBy);
        if (!!specialFilter)
            params = params.append('specialFilter', specialFilter);
        params.append('observe', 'response');
        params.append('responseType', 'arraybuffer');
        const fileParams: any = {
            observe: 'response',
            responseType: 'arraybuffer',
            params,
        };
        return this._httpClient.get(route, fileParams).toPromise();
    }

    downloadPendingTasksReport(
        filter: string = '',
        rangeField: string = '',
        rangeStart: string = '',
        rangeEnd: string = '',
        sortBy: string = '-createdAt',
        specialFilter: string = '',
        formatType: number
    ) {
        const route: string = TASK_ENDPOINTS.reportPendingTasks(
            this._workspaceId
        );
        let params: HttpParams = new HttpParams();
        if (!!filter) params = params.append('filter', filter);
        if (!!rangeField) params = params.append('rangeField', rangeField);
        if (!!rangeStart) params = params.append('rangeStart', rangeStart);
        if (!!rangeEnd) params = params.append('rangeEnd', rangeEnd);
        if (!!formatType) params = params.append('formatType', formatType);
        if (!!sortBy) params = params.append('sortBy', sortBy);
        if (!!specialFilter)
            params = params.append('specialFilter', specialFilter);
        params.append('observe', 'response');
        params.append('responseType', 'arraybuffer');
        const fileParams: any = {
            observe: 'response',
            responseType: 'arraybuffer',
            params,
        };
        return this._httpClient.get(route, fileParams).toPromise();
    }

    getTotalWorkspaceTasks(
        filters: string = '',
        rangeField: string = '',
        rangeStart: string = '',
        rangeEnd: string = ''
    ): Observable<number> {
        return this._apiHttp
            .param('filter', filters)
            .param('rangeField', rangeField)
            .param('rangeStart', rangeStart)
            .param('rangeEnd', rangeEnd)
            .get(TASK_ENDPOINTS.totalWorkspaceTasks(this._workspaceId));
    }

    getTask(taskId: string = '', fields: string = ''): Observable<Task> {
        return this._apiHttp
            .param('fields', fields)
            .get(TASK_ENDPOINTS.workspaceTask(this._workspaceId, taskId));
    }

    getWorkspaceTasks(
        page: number = 1,
        perPage: number = 1,
        fields: string = '',
        filter: string = '',
        sortBy: string = '',
        search: string = '',
        rangeField: string = '',
        rangeStart: string = '',
        rangeEnd: string = '',
        specialFilter: string = ''
    ): Observable<HttpResponseItems> {
        return this._apiHttp
            .param('page', page.toString())
            .param('perPage', perPage.toString())
            .param('fields', fields)
            .param('filter', filter)
            .param('sortBy', sortBy)
            .param('search', search)
            .param('rangeField', rangeField)
            .param('rangeStart', rangeStart)
            .param('rangeEnd', rangeEnd)
            .param('specialFilter', specialFilter)
            .get(TASK_ENDPOINTS.workspaceTasks(this._workspaceId));
    }

    sendTaskNotification(requestBody: SendTaskNotfication): Observable<string> {
        return this._apiHttp.post(
            TASK_ENDPOINTS.taskNotifications,
            requestBody
        );
    }

    updateTask(taskId: string, requestBody: UpdateTask): Observable<void> {
        return this._apiHttp.put(
            TASK_ENDPOINTS.workspaceTask(this._workspaceId, taskId),
            requestBody
        );
    }
}
