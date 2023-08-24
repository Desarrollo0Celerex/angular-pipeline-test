import { Injectable } from '@angular/core';
import { ApiHttp } from '@core/http/api.http';
import { environment } from '@env/environment';
import { AuthService } from '@features-legacy/auth/services/auth.service';
import { CreateTaskDataSend } from '@tasks/interfaces/create-task-data-send.interface';
import { Task } from '@tasks/interfaces/task.interface';
import { Observable } from 'rxjs';

const ENDPOINTS: any = {
    workspaceTask: (workspaceId: string, taskId: string) =>
        `${environment.apiUrl}/workspaces/${workspaceId}/tasks/${taskId}`,
    workspaceTasks: (workspaceId: string) =>
        `${environment.apiUrl}/workspaces/${workspaceId}/tasks`,
};

@Injectable()
export class TaskService {
    private _workspaceId: string = this._authService.workspaceId;

    constructor(private _apiHttp: ApiHttp, private _authService: AuthService) {}

    createTask(requestBody: CreateTaskDataSend): Observable<Task> {
        return this._apiHttp.post(
            ENDPOINTS.workspaceTasks(this._workspaceId),
            requestBody
        );
    }

    getWorkspaceTask(
        taskId: string = '',
        fields: string = ''
    ): Observable<Task> {
        return this._apiHttp
            .param('fields', fields)
            .get(ENDPOINTS.workspaceTask(this._workspaceId, taskId));
    }
}
