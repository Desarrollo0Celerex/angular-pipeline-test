import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DEFAULT_PER_PAGE } from '@constants/global';
import { environment } from '@env/environment';
import { CreatePartnerDataSend } from '@interfaces/create-partner-data-send.interface';
import { UpdatePartnerDataSend } from '@interfaces/update-partner-data-send.interface';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { AuthService } from '@features-legacy/auth/services/auth.service';

const routes: any = {
    partners: (workspaceId: string) =>
        environment.apiUrl + '/workspaces/' + workspaceId + '/partners',
    partner: (workspaceId: string, partnerId: string) =>
        environment.apiUrl +
        '/workspaces/' +
        workspaceId +
        '/partners/' +
        partnerId,
    partnerAnnualWallet: (
        workspaceId: string,
        partnerId: string,
        year: number
    ) =>
        environment.apiUrl +
        '/workspaces/' +
        workspaceId +
        '/partners/' +
        partnerId +
        '/annual-wallet/' +
        year,
    partnerClients: (workspaceId: string, partnerId: string) =>
        environment.apiUrl +
        '/workspaces/' +
        workspaceId +
        '/partners/' +
        partnerId +
        '/clients',
    partnerCoincidences: (workspaceId: string) =>
        environment.apiUrl +
        '/workspaces/' +
        workspaceId +
        '/partners/coincidences',
    totalPartners: (workspaceId: string) =>
        environment.apiUrl + '/workspaces/' + workspaceId + '/partners/count',
};

@Injectable()
export class PartnerService {
    private _workspaceId: string = this._authService.workspaceId;

    constructor(
        private _httpClient: HttpClient,
        private _authService: AuthService
    ) {}

    checkHasCoincidences(name: string): Observable<boolean> {
        const route: string = routes.partnerCoincidences(this._workspaceId);
        return this._httpClient
            .post<HttpResponse>(route, { name })
            .pipe(map((res: HttpResponse) => res.data));
    }

    /**
     * Create the partner in the API
     * @param  requestBody Partner data to create
     * @return             Notification of action done
     */
    createPartner(requestBody: CreatePartnerDataSend): Observable<void> {
        const route: string = routes.partners(this._workspaceId);
        return this._httpClient.post<void>(route, requestBody);
    }

    deletePartner(partnerId: number): Observable<void> {
        const route: string = routes.partner(
            this._workspaceId,
            partnerId.toString()
        );
        return this._httpClient.delete<void>(route);
    }

    /**
     * Get the partners from the API
     * @param  page            The page number
     * @param  fields          The fields to get
     * @return                 The partners
     */
    getPartner(
        partnerId: number,
        fields: string = ''
    ): Observable<HttpResponse> {
        const route: string = routes.partner(this._workspaceId, partnerId);
        let params: HttpParams = new HttpParams();
        if (!!fields) params = params.append('fields', fields);
        return this._httpClient.get<HttpResponse>(route, { params });
    }

    getPartnerAnnualWallet(
        partnerId: number,
        year: number,
        fields: string
    ): Observable<HttpResponse> {
        const route: string = routes.partnerAnnualWallet(
            this._workspaceId,
            partnerId,
            year
        );
        let params: HttpParams = new HttpParams();
        params = params.append('fields', fields);
        return this._httpClient.get<HttpResponse>(route, { params });
    }

    getPartnerClients(
        partnerId: string,
        fields: string = '',
        page: number = 1,
        query: string = '',
        perPage: number = 12
    ): Observable<HttpResponse> {
        const route: string = routes.partnerClients(
            this._workspaceId,
            partnerId
        );
        let params: HttpParams = new HttpParams();
        params = params.append('page', page.toString());
        params = params.append('perPage', perPage.toString());
        if (!!fields) params = params.append('fields', fields);
        if (!!query) params = params.append('search', 'contactName:' + query);
        params = params.append('sortBy', '-createdAt');
        return this._httpClient.get<HttpResponse>(route, { params });
    }

    /**
     * Get the partners from the API
     * @param  page            The page number
     * @param  fields          The fields to get
     * @param  partnerStatusId    The filter to apply
     * @param  query           The search to do
     * @return                 The partners
     */
    getPartners(
        page: number = 1,
        fields: string = '',
        filters: string = '',
        query: string = '',
        perPage = DEFAULT_PER_PAGE
    ): Observable<HttpResponse> {
        const route: string = routes.partners(this._workspaceId);
        let params: HttpParams = new HttpParams();
        params = params.append('page', page.toString());
        params = params.append('perPage', perPage.toString());
        if (!!fields) params = params.append('fields', fields);
        if (!!filters) params = params.append('filter', filters);
        if (!!query) params = params.append('search', 'name:' + query);
        params = params.append('sortBy', '-createdAt');
        return this._httpClient.get<HttpResponse>(route, { params });
    }

    /**
     * Get the total partners from the API
     * @param  filters The filters to apply
     * @return         The total partners
     */
    getTotalPartners(filters: string = ''): Observable<number> {
        const route: string = routes.totalPartners(this._workspaceId);
        let params: HttpParams = new HttpParams();
        if (!!filters) params = params.append('filter', filters);
        return this._httpClient
            .get<HttpResponse>(route, { params })
            .pipe(map((res: HttpResponse) => res.data));
    }

    updatePartner(
        partnerId: number,
        requestBody: UpdatePartnerDataSend
    ): Observable<void> {
        const route: string = routes.partner(
            this._workspaceId,
            partnerId.toString()
        );
        return this._httpClient.put<void>(route, requestBody);
    }
}
