import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { CreateScannerLogDataSend } from '@interfaces/create-scanner-log-data-send.interface';
import { AuthService } from '@core/services/auth.service';

const routes: any = {
    scannerLogs: (workspaceId: string, contactId: string, policyId: string) =>
        environment.apiUrl +
        '/workspaces/' +
        workspaceId +
        '/contacts/' +
        contactId +
        '/policies/' +
        policyId +
        '/scanner-logs',
};

@Injectable()
export class ScannerLogService {
    private _workspaceId: string = this._authService.workspaceId;

    constructor(
        private _httpClient: HttpClient,
        private _authService: AuthService
    ) {}

    /**
     * Create a scanner log from the API
     * @param  contactId   The contact ID
     * @param  policyId    The policy ID
     * @param  requestBody The request body
     * @return             Notice of action done
     */
    createScannerLog(
        contactId: string,
        policyId: string,
        requestBody: CreateScannerLogDataSend
    ): Observable<void> {
        const route: string = routes.scannerLogs(
            this._workspaceId,
            contactId,
            policyId
        );
        return this._httpClient.post<void>(route, requestBody);
    }
}
