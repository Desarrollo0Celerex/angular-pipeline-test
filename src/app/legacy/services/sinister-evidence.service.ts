import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@env/environment';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { SinisterEvidence } from '@interfaces/sinister-evidence.interface';
import { SinisterDataSend } from '@interfaces/sinister-data-send.interface';
import { AuthService } from '@features-legacy/auth/services/auth.service';

export const SINISTER_EVIDENCE_ENDPOINTS: any = {
    sinisterEvidences: (
        workspaceId: string,
        contactId: string,
        policyId: string,
        sinisterId: string
    ) =>
        environment.agenthos.apiUrl +
        '/workspaces/' +
        workspaceId +
        '/contacts/' +
        contactId +
        '/policies/' +
        policyId +
        '/sinisters/' +
        sinisterId +
        '/evidences',
};

@Injectable()
export class SinisterEvidenceService {
    private _workspaceId: string = this._authService.workspaceId;

    constructor(
        private _httpClient: HttpClient,
        private _authService: AuthService
    ) {}

    getSinisterEvidences(
        sinisterData: SinisterDataSend,
        fields: string = '',
        sortBy: string = '-createdAt'
    ): Observable<SinisterEvidence[]> {
        const route: string = SINISTER_EVIDENCE_ENDPOINTS.sinisterEvidences(
            this._workspaceId,
            sinisterData.contactId,
            sinisterData.policyId,
            sinisterData.sinisterId
        );
        let params: HttpParams = new HttpParams();
        if (!!fields) params = params.append('fields', fields);
        params = params.append('sortBy', sortBy);
        return this._httpClient
            .get<HttpResponse>(route, { params })
            .pipe(map((res: HttpResponse) => res.data.items));
    }

    uploadSinisterEvidence(
        sinisterData: SinisterDataSend,
        requestBody: FormData
    ): Observable<void> {
        const route: string = SINISTER_EVIDENCE_ENDPOINTS.sinisterEvidences(
            this._workspaceId,
            sinisterData.contactId,
            sinisterData.policyId,
            sinisterData.sinisterId
        );
        return this._httpClient.post<void>(route, requestBody);
    }
}
