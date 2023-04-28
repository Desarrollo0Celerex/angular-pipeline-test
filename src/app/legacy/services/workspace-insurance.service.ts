import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@env/environment';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { AuthService } from '@core/services/auth/auth.service';
import { Insurance } from '@interfaces/insurance.interface';

const routes = {
    totalWorkspaceInsurances: (workspaceId: string) =>
        environment.apiUrl +
        '/workspaces/' +
        workspaceId +
        '/workspace-insurances/count',
    workspaceInsurance: (workspaceId: string, insuranceId: number) =>
        environment.apiUrl +
        '/workspaces/' +
        workspaceId +
        '/workspace-insurances/' +
        insuranceId,
    workspaceInsurances: (workspaceId: string) =>
        environment.apiUrl +
        '/workspaces/' +
        workspaceId +
        '/workspace-insurances',
};

@Injectable()
export class WorkspaceInsuranceService {
    private _workspaceId: string = this._authService.workspaceId;

    constructor(
        private _authService: AuthService,
        private _httpClient: HttpClient
    ) {}

    addWorkspaceInsurance(insuranceId: number): Observable<void> {
        const route = routes.workspaceInsurances(this._workspaceId);
        return this._httpClient.post<void>(route, { insuranceId });
    }

    getWorkspaceInsurances(fields: string = ''): Observable<Insurance[]> {
        const route = routes.workspaceInsurances(this._workspaceId);
        let params: HttpParams = new HttpParams();
        params = params.append('fields', fields);
        return this._httpClient
            .get<HttpResponse>(route, { params })
            .pipe(map((res: HttpResponse) => res.data));
    }

    getTotalWorkspaceInsurances(): Observable<number> {
        const route = routes.totalWorkspaceInsurances(this._workspaceId);
        return this._httpClient.get<HttpResponse>(route).pipe(
            map((res: HttpResponse) => {
                return res.data;
            })
        );
    }

    removeWorkspaceInsurance(insuranceId: number): Observable<void> {
        const route = routes.workspaceInsurance(this._workspaceId, insuranceId);
        return this._httpClient.delete<void>(route);
    }
}
