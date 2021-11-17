import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@env/environment';
import { CreatePartnerDataSend } from '@interfaces/create-partner-data-send.interface';
import { HttpResponse } from '@interfaces/http-response.interface';
import { AuthService } from '@services/auth.service';

const routes: any = {
    partners: (workspaceId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/partners',
    partnerCoincidences: (workspaceId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/partners/coincidences',
    totalPartners: (workspaceId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/partners/count',
}

@Injectable()
export class PartnerService {
    private _workspaceId: string = this._authService.workspaceId;

    constructor(
        private _httpClient: HttpClient,
        private _authService: AuthService
    ) { }

    checkHasCoincidences(name: string): Observable<HttpResponse> {
        const route: string = routes.partnerCoincidences(this._workspaceId);
        return this._httpClient.post<HttpResponse>(route, { name });
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

    /**
     * Get the partners from the API
     * @param  page            The page number
     * @param  fields          The fields to get
     * @param  partnerStatusId    The filter to apply
     * @param  query           The search to do
     * @return                 The partners
     */
   getPartners(page: number = 1, fields: string = '', filters: string = '', query: string = ''): Observable<HttpResponse> {
       const route: string = routes.partners(this._workspaceId);
       let params: HttpParams = new HttpParams();
       params = params.append('page', page.toString());
       if(!!fields) params = params.append('fields', fields);
       if(!!filters) params = params.append('filter', filters);
       if(!!query) params = params.append('search', 'name:' + query);
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
        if(!!filters) params = params.append('filter', filters);
        return this._httpClient.get<HttpResponse>(route, { params }).pipe(
            map((res: HttpResponse) => res.data )
        );
    }
}
