import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { CreateReceiptPaidDataSend } from '@interfaces/create-receipt-paid-data-send.interface';
import { HttpResponse } from '@interfaces/http-response.interface';
import { AuthService } from '@services/auth.service';

const routes: any = {
    receiptsPaid: (workspaceId: string, paymentId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/payments/'+paymentId+'/receipts-paid'
}

@Injectable()
export class ReceiptPaidService {
    private _workspaceId: string = this._authService.workspaceId;

    constructor(
        private _httpClient: HttpClient,
        private _authService: AuthService
    ) { }

    /**
     * Create the payment in the API
     * @param  requestBody The request body
     * @return             Notice of actiion done
     */
    createReceiptPaid(paymentId: string, requestBody: CreateReceiptPaidDataSend): Observable<HttpResponse> {
        const route: string = routes.receiptsPaid(this._workspaceId, paymentId);
        return this._httpClient.post<HttpResponse>(route, requestBody);
    }
}
