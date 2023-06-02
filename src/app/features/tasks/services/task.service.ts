import { Injectable } from '@angular/core';
import { TASK_ENDPOINTS } from '@core/constants/endpoints';
import { ApiHttp } from '@core/http/api.http';
import { CreateTask } from '@features/tasks/interfaces/create-task.interface';
import { Observable } from 'rxjs';
import { AuthService } from '@features/auth/services/auth.service';
import { HttpResponseItems } from '@core/interfaces/http-response-items.interface';
import { UpdateTask } from '../interfaces/update-task.interface';
import { Task } from '../interfaces/task.interface';

@Injectable({
    providedIn: 'root',
})
export class TaskService {
    private _workspaceId: string = this._authService.workspaceId;

    constructor(private _apiHttp: ApiHttp, private _authService: AuthService) {}

    createTask(requestBody: CreateTask): Observable<void> {
        return this._apiHttp.post(
            TASK_ENDPOINTS.workspaceTasks(this._workspaceId),
            requestBody
        );
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

    updateTask(taskId: string, requestBody: UpdateTask): Observable<void> {
        return this._apiHttp.put(
            TASK_ENDPOINTS.workspaceTask(this._workspaceId, taskId),
            requestBody
        );
    }
}
