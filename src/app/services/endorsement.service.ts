import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { HttpResponse } from '@interfaces/http-response.interface';
import { AuthService } from '@services/auth.service';

const routes: any = {
    endorsement: (workspaceId: string, contactId: string, policyId: string, endorsementId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/contacts/' + contactId + '/policies/' + policyId + '/endorsements/' + endorsementId,
    policyEndorsements: (workspaceId: string, contactId: string, policyId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/contacts/' + contactId + '/policies/' + policyId + '/endorsements',
}

@Injectable()
export class EndorsementService {
    private _workspaceId: string;

    constructor(
        private _httpClient: HttpClient,
        private _authService: AuthService
    ) {
        this._workspaceId = this._authService.workspaceId;
    }

    /**
     * Get the endorsement from the API
     * @param  contactId        The contact ID
     * @param  policyId         The policy ID to update
     * @param  endorsementId    The endorsement ID to update
     * @return                  The endorsement data
     */
    getEndorsement(contactId: string, policyId: string, endorsementId: string, fields: string = ''): Observable<HttpResponse> {
        const route: string = routes.endorsement(this._workspaceId, contactId, policyId, endorsementId);
        let params: HttpParams = new HttpParams();
        if(!!fields) params = params.append('fields', fields);
        return this._httpClient.get<HttpResponse>(route, {params});
    }

    getPolicyEndorsements(contactId: string, policyId: string, page: number = 1, fields: string = ''): Observable<HttpResponse> {
        const route: string = routes.policyEndorsements(this._workspaceId, contactId, policyId);
        let params: HttpParams = new HttpParams();
        params = params.append('page', page.toString());
        if(!!fields) params = params.append('fields', fields);
        params = params.append('sortBy', 'createdAt');
        return this._httpClient.get<HttpResponse>(route, {params});
    }
}
