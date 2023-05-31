import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { RECEIPT_PAID_ENDPOINTS } from '@core/constants/endpoints';
import { AuthService } from '@features/auth/services/auth.service';
import { ApiHttp } from '@core/http/api.http';
import { HttpResponseItems } from '@core/interfaces/http-response-items.interface';
import { ContainerCharts } from '@core/interfaces/container-charts.interface';

@Injectable({
    providedIn: 'root',
})
export class ReceipPaidService {
    private _workspaceId: string = this._authService.workspaceId;

    constructor(private _apiHttp: ApiHttp, private _authService: AuthService) {}

    getPartnerReceipsPaid(
        partnerId: string,
        page: number = 1,
        perPage: number = 1,
        fields: string = '',
        filter: string = '',
        sortBy: string = '',
        search: string = '',
        rangeField: string = '',
        rangeStart: string = '',
        rangeEnd: string = '',
        specialFilter: string = ''
    ): Observable<HttpResponseItems> {
        return this._apiHttp
            .param('page', page.toString())
            .param('perPage', perPage.toString())
            .param('fields', fields)
            .param('filter', filter)
            .param('sortBy', sortBy)
            .param('search', search)
            .param('rangeField', rangeField)
            .param('rangeStart', rangeStart)
            .param('rangeEnd', rangeEnd)
            .param('specialFilter', specialFilter)
            .get(
                RECEIPT_PAID_ENDPOINTS.partnerReceipsPaid(
                    this._workspaceId,
                    partnerId
                )
            );
    }

    getPartnerReceipsPaisStats(
        partnerId: string,
        filters: string = '',
        rangeField: string = '',
        rangeStart: string = '',
        rangeEnd: string = '',
        specialFilter: string = ''
    ): Observable<ContainerCharts> {
        return this._apiHttp
            .param('filter', filters)
            .param('rangeField', rangeField)
            .param('rangeStart', rangeStart)
            .param('rangeEnd', rangeEnd)
            .param('specialFilter', specialFilter)
            .get(
                RECEIPT_PAID_ENDPOINTS.partnerReceiptsPaidStats(
                    this._workspaceId,
                    partnerId
                )
            );
    }
}
