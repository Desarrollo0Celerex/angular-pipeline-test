import { Injectable } from '@angular/core';
import { TASK_ENDPOINTS } from '@configs/endpoints.config';
import { ApiHttp } from '@core/http/api.http';
import { CreateTask } from '@core/interfaces/create-task.interface';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

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
}
