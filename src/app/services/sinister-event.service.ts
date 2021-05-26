import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { ReportEventDataSend } from '@interfaces/report-event-data-send.interface';
import { AuthService } from '@services/auth.service';

const routes: any = {
    sinisterEvents: (workspaceId: string, contactId: string, policyId: string, sinisterId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/contacts/' + contactId + '/policies/' + policyId + '/sinisters/' + sinisterId + '/events'
}

@Injectable()
export class SinisterEventService {
    private _workspaceId: string = this._authService.workspaceId;

    constructor(
        private _httpClient: HttpClient,
        private _authService: AuthService
    ) { }

    /**
     * Report a sinister event from the API
     * @param  contactId   The contact ID
     * @param  policyId    The policy ID
     * @param  sinisterId  The sinister ID
     * @param  requestBody The request body
     * @return             Notice of action done
     */
    reportSinisterEvent(contactId: string, policyId: string, sinisterId: string, requestBody: ReportEventDataSend): Observable<void> {
        const route: string = routes.sinisterEvents(this._workspaceId, contactId, policyId, sinisterId);
        return this._httpClient.post<void>(route, requestBody);
    }
}
