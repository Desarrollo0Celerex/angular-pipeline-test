import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { HttpResponse } from '@interfaces/http-response.interface';
import { AuthService } from '@services/auth.service';

const routes: any = {
    cancelledPolicy: (workspaceId: string, cancelledPolicyId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/cancelled-policies/' + cancelledPolicyId
}

@Injectable()
export class CancelledPolicyService {
    private _workspaceId: string;

    constructor(
        private _httpClient: HttpClient,
        private _authService: AuthService
    ) {
        this._workspaceId = this._authService.workspaceId;
    }

    /**
     * Get the cancelled policy from the API
     * @param  cancelledPolicyId The cancelled policy ID
     * @param  fields            The fields to get
     * @return                   The cancelled policy
     */
   public getCancelledPolicy(cancelledPolicyId: string, fields: string = ''): Observable<HttpResponse> {
       const route: string = routes.cancelledPolicy(this._workspaceId, cancelledPolicyId);
       let params: HttpParams = new HttpParams();
       if(!!fields) params = params.append('fields', fields);
       return this._httpClient.get<HttpResponse>(route, { params });
   }
}
