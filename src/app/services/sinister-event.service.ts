import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { HttpResponse } from '@interfaces/http-response.interface';
import { SinisterEventDataSend } from '@interfaces/sinister-event-data-send.interface';
import { ReportEventDataSend } from '@interfaces/report-event-data-send.interface';
import { AuthService } from '@services/auth.service';

const routes: any = {
    sinisterEvents: (workspaceId: string, contactId: string, policyId: string, sinisterId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/contacts/' + contactId + '/policies/' + policyId + '/sinisters/' + sinisterId + '/events',
    sinisterEvent: (workspaceId: string, contactId: string, policyId: string, sinisterId: string, sinisterEventId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/contacts/' + contactId + '/policies/' + policyId + '/sinisters/' + sinisterId + '/events/' + sinisterEventId
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

    /**
     * Get the sinister event
     * @param  sinisterEventDataa   The sinister event data
     * @param  fields               The fields to get
     * @return                      The sinister event
     */
    getSinisterEvent(sinisterEventData: SinisterEventDataSend, fields: string = ''): Observable<HttpResponse> {
        const route: string = routes.sinisterEvent(this._workspaceId, sinisterEventData.contactId, sinisterEventData.policyId, sinisterEventData.sinisterId, sinisterEventData.sinisterEventId);
        let params: HttpParams = new HttpParams();
        if(!!fields) params = params.append('fields', fields);
        return this._httpClient.get<HttpResponse>(route, {params});
    }

    /**
     * Update a sinister event from the API
     * @param  SinisterEventDataSend    The sinister event data
     * @param  requestBody              The request body
     * @return                          Notice of action done
     */
    updateSinisterEvent(sinisterEventData: SinisterEventDataSend, requestBody: ReportEventDataSend): Observable<void> {
        const route: string = routes.sinisterEvent(this._workspaceId, sinisterEventData.contactId, sinisterEventData.policyId, sinisterEventData.sinisterId, sinisterEventData.sinisterEventId);
        return this._httpClient.put<void>(route, requestBody);
    }
}
