import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@env/environment';
import { CreateReceiptPaidDataSend } from '@interfaces/create-receipt-paid-data-send.interface';
import { HttpResponse } from '@interfaces/http-response.interface';
import { ReceiptPaid } from '@interfaces/receipt-paid.interface';
import { AuthService } from '@services/auth.service';

const routes: any = {
    receiptsPaid: (workspaceId: string, paymentId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/payments/'+paymentId+'/receipts-paid',
    receiptPaid: (workspaceId: string, paymentId: string, receiptPaidId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/payments/'+paymentId+'/receipts-paid/'+receiptPaidId,
    receiptPaidAux: (workspaceId: string, receiptPaidId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/receipts-paid/'+receiptPaidId
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

    /**
     * delete the receipt paid fron the DB
     * @param  paymentId     The payment ID
     * @param  receiptPaidId The receipt paid ID to delete
     * @return               Notice of action done
     */
    deleteReceiptPaid(paymentId: string, receiptPaidId: string): Observable<void> {
        const route: string = routes.receiptPaid(this._workspaceId, paymentId, receiptPaidId);
        return this._httpClient.delete<void>(route);
    }

    getReceiptPaid(receiptPaidId: string, fields: string = ''): Observable<ReceiptPaid> {
        const route: string = routes.receiptPaidAux(this._workspaceId, receiptPaidId);
        let params: HttpParams = new HttpParams();
        if(!!fields) params = params.append('fields', fields);
        return this._httpClient.get<HttpResponse>(route, {params}).pipe(
            map((res: HttpResponse) => { return res.data; })
        );
    }

    /**
     * Get the receipts paid
     * @param  paymentId  The payment ID
     * @param  page      The page to get
     * @param  fields    The fields to get
     * @return           The history payment
     */
    getReceiptsPaid(paymentId: string, page: number = 1, fields: string = ''): Observable<HttpResponse> {
        const route: string = routes.receiptsPaid(this._workspaceId, paymentId);
        let params: HttpParams = new HttpParams();
        params = params.append('page', page.toString());
        if(!!fields) params = params.append('fields', fields);
        params = params.append('sortBy', '-createdAt');
        return this._httpClient.get<HttpResponse>(route, {params});
    }

}
