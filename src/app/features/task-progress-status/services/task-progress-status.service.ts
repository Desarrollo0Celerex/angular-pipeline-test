import { Injectable } from '@angular/core';
import { TASK_PROGRESS_STATUS_ENDPOINTS } from '@core/constants/endpoints';
import { ApiHttp } from '@core/http/api.http';
import { TaskProgressStatus } from '@features/task-progress-status/interfaces/task-progress-status.interface';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TaskProgressStatusService {
    constructor(private _apiHttp: ApiHttp) {}

    getTaskProgressStatus(
        fields: string = ''
    ): Observable<TaskProgressStatus[]> {
        return this._apiHttp
            .param('fields', fields)
            .get(TASK_PROGRESS_STATUS_ENDPOINTS.taskProgressStatus);
    }
}
