import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SINISTER_STATUS, SINISTER_STATUS_OPEN } from '@constants/global';
import { environment } from '@env/environment';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { SinisterStatus } from '@interfaces/sinister-status.interface';
import { AuthService } from '@features-legacy/auth/services/auth.service';

const ROUTES = {
    sinisterStatus: `${environment.agenthos.apiUrl}/sinister-status`,
    sinisterStatusStats: (workspaceId: string) =>
        `${environment.agenthos.apiUrl}/workspaces/${workspaceId}/stats/sinister-status`,
};

@Injectable()
export class SinisterStatusService {
    private _workspaceId: string = this._authService.workspaceId;

    constructor(
        private _authService: AuthService,
        private _httpClient: HttpClient
    ) {}

    /**
     * Get the sinister status from the API
     * @param  fields The fields to get
     * @return        The sinister status
     */
    getSinisterStatus(fields: string = ''): Observable<HttpResponse> {
        const route: string = ROUTES.sinisterStatus;
        let params: HttpParams = new HttpParams();
        if (!!fields) params = params.append('fields', fields);
        return this._httpClient.get<HttpResponse>(route, { params }).pipe(
            map((res: HttpResponse) => {
                const response: HttpResponse = {
                    data: this._removeFinishedSinisterStatus(res.data),
                };
                return response;
            })
        );
    }

    /**
     * Get the sinister status of profile from the API
     * @param  fields The fields to get
     * @return        The sinister status
     */
    getProfileSinisterStatus(): SinisterStatus[] {
        const sinisterStatus: SinisterStatus[] = [
            {
                sinisterStatusId: SINISTER_STATUS_OPEN,
                name: 'Abierto',
                background: '',
                icon: '',
            },
            {
                sinisterStatusId: SINISTER_STATUS.FINISHED,
                name: 'Cerrado',
                background: '',
                icon: '',
            },
        ];
        return sinisterStatus;
    }

    /**
     * Get the sinister status stats
     * @param  filters The filters to apply
     * @return         The sinister status stats
     */
    getSinisterStatusStats(filters: string = ''): Observable<any[]> {
        const route: string = ROUTES.sinisterStatusStats(this._workspaceId);
        let params: HttpParams = new HttpParams();
        if (!!filters) params = params.append('filter', filters);
        return this._httpClient
            .get<HttpResponse>(route, { params })
            .pipe(map((res: HttpResponse) => res.data));
    }

    /**
     * Remove the finished sinister status
     * @param  sinisterStatus The sinister status to filter
     * @return               The filtered sinister status
     */
    private _removeFinishedSinisterStatus(
        sinisterStatus: SinisterStatus[]
    ): SinisterStatus[] {
        return sinisterStatus.filter(
            (element: SinisterStatus) =>
                element.sinisterStatusId !== SINISTER_STATUS.FINISHED
        );
    }
}
