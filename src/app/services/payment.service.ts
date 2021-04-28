import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { HttpResponse } from '@interfaces/http-response.interface';
import { AuthService } from '@services/auth.service';

const routes: any = {
    payments: (workspaceId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/payments',
    totalPayments: (workspaceId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/payments/count'
}

@Injectable()
export class PaymentService {
    private _workspaceId: string = this._authService.workspaceId;

    constructor(
        private _httpClient: HttpClient,
        private _authService: AuthService
    ) { }

     /**
      * Get the payments from the API
      * @param  page            The page number
      * @param  fields          The fields to get
      * @param  paymentStatusId    The filter to apply
      * @param  query           The search to do
      * @return                 The payments
      */
    public getPayments(page: number = 1, fields: string = '', paymentStatusId: number = 0, query: string = ''): Observable<HttpResponse> {
        const route: string = routes.payments(this._workspaceId);
        let params: HttpParams = new HttpParams();
        params = params.append('page', page.toString());
        if(!!fields) params = params.append('fields', fields);
        if(!!paymentStatusId) params = params.append('filter', 'paymentStatusId[=]' + paymentStatusId);
        //if(!!query) params = params.append('search', 'contactName:' + query);
        params = params.append('sortBy', '-paymentDate');
        return this._httpClient.get<HttpResponse>(route, { params });
    }

    /**
     * Get the total payments from the API
     * @param  paymentStatusId The filter to apply
     * @return              The total clients
     */
    getTotalPayments(paymentStatusId: number = 0): Observable<HttpResponse> {
        const route: string = routes.totalPayments(this._workspaceId);
        let params: HttpParams = new HttpParams();
        if(!!paymentStatusId) params = params.append('filter', 'paymentStatusId[=]' + paymentStatusId);
        return this._httpClient.get<HttpResponse>(route, { params });
    }
}
