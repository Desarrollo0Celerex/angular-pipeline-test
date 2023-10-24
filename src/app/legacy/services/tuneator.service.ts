import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { AuthService } from '@features-legacy/auth/services/auth.service';

const ROUTES = {
    tuneator: (workspaceId: string) =>
        `${environment.tuneator.apiUrl}/${workspaceId}`,
};

@Injectable()
export class TuneatorService {
    private _workspaceId: string = this._authService.workspaceId;

    constructor(
        private _authService: AuthService,
        private _httpClient: HttpClient
    ) {}

    addPolicyCover(policyUrl: string): Observable<any> {
        const route: string = ROUTES.tuneator(this._workspaceId);
        return this._httpClient.post(
            route,
            {
                fileUrl: policyUrl,
            },
            { responseType: 'blob' }
        );
    }

    addPolicyCoverByFile(requestBody: FormData): Observable<any> {
        const route: string = ROUTES.tuneator(this._workspaceId);
        return this._httpClient.post<HttpResponse>(route, requestBody);
    }
}
