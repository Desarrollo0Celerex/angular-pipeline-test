import { Injectable } from '@angular/core';
import { ApiHttp } from '@core/http/api.http';
import { environment } from '@env/environment';
import { TaskProgressStatus } from '@task-progress-status/interfaces/task-progress-status.interface';
import { Observable } from 'rxjs';

const ENDPOINTS = {
    taskProgressStatus: `${environment.agenthos.apiUrl}/task-progress-status`,
};

@Injectable()
export class TaskProgressStatusService {
    constructor(private _apiHttp: ApiHttp) {}

    getTaskProgressStatus(
        fields: string = ''
    ): Observable<TaskProgressStatus[]> {
        return this._apiHttp
            .param('fields', fields)
            .get(ENDPOINTS.taskProgressStatus);
    }
}
