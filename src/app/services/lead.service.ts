import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { HttpResponse } from '@interfaces/http-response.interface';
import { AuthService } from '@services/auth.service';

const routes: any = {
    totalLeads: (workspaceId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/leads/count'
}

@Injectable()
export class LeadService {
    private _workspaceId: string;

    constructor(
        private _httpClient: HttpClient,
        private _authService: AuthService
    ) {
        this._workspaceId = this._authService.workspaceId;
    }

    /**
     * Get the total leads from the API
     * @return The total leads
     */
    getTotalLeads(leadStatusId: number = 0): Observable<HttpResponse> {
        const route: string = routes.totalLeads(this._workspaceId);
        let params: HttpParams = new HttpParams();
        params = params.append('filter', 'leadStatusId[=]' + leadStatusId);
        return this._httpClient.get<HttpResponse>(route, { params });
    }
}
