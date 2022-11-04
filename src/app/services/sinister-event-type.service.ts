import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@env/environment';
import { HttpResponse } from '@interfaces/http-response.interface';
import { SinisterDataSend } from '@interfaces/sinister-data-send.interface';
import { SinisterEventType } from '@interfaces/sinister-event-type.interface';
import { AuthService } from '@services/auth.service';

const ROUTES = {
    sinisterEventTypes: (
        workspaceId: string,
        contactId: string,
        policyId: string,
        sinisterId: string,
        insuranceGroupId: number
    ) =>
        `${environment.apiUrl}/workspaces/${workspaceId}/contacts/${contactId}/policies/${policyId}/sinisters/${sinisterId}/insurance-groups/${insuranceGroupId}/sinister-event-types`,
};

@Injectable()
export class SinisterEventTypeService {
    private _workspaceId: string = this._authService.workspaceId;

    constructor(
        private _authService: AuthService,
        private _httpClient: HttpClient
    ) {}

    /**
     * Get the sinister event types from the API
     * @param  fields      The fields to get
     * @return             The sinister event types
     */
    getSinisterEventTypes(sinisterData: SinisterDataSend, insuranceGroupId: number, fields: string = ''): Observable<SinisterEventType[]> {
        const route: string = ROUTES.sinisterEventTypes(this._workspaceId, sinisterData.contactId, sinisterData.policyId, sinisterData.sinisterId, insuranceGroupId);
        let params: HttpParams = new HttpParams();
        if (!!fields) params = params.append('fields', fields);
        return this._httpClient.get<HttpResponse>(route, { params }).pipe(
            map((res: HttpResponse) => res.data)
        );
    }
}
