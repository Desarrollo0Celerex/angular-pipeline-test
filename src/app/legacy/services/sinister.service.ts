import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DEFAULT_PHONE_CODE_ID } from '@constants/global';
import { environment } from '@env/environment';
import { CreateSinister } from '@interfaces/create-sinister.interface';
import { SinisterDataSend } from '@interfaces/sinister-data-send.interface';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { Sinister } from '@interfaces/sinister.interface';
import { SinisterStat } from '@interfaces/sinister-stat.interface';
import { UpdateSinisterCertificateDataSend } from '@interfaces/update-sinister-certificate-data-send.interface';
import { UpdateSinisterDetailsDataSend } from '@interfaces/update-sinister-details-data-send.interface';
import { UpdateSinisterReportDataSend } from '@interfaces/update-sinister-report-data-send.interface';
import { UpdateSinisterTrackingDataSend } from '@interfaces/update-sinister-tracking-data-send.interface';
import { AuthService } from '@features-legacy/auth/services/auth.service';

import * as moment from 'moment';

const routes: any = {
    sinister: (workspaceId: string, sinisterId: string) =>
        environment.agenthos.apiUrl +
        '/workspaces/' +
        workspaceId +
        '/sinisters/' +
        sinisterId,
    sinisters: (workspaceId: string) =>
        environment.agenthos.apiUrl +
        '/workspaces/' +
        workspaceId +
        '/sinisters',
    totalSinisters: (workspaceId: string) =>
        environment.agenthos.apiUrl +
        '/workspaces/' +
        workspaceId +
        '/sinisters/count',
    contactSinisters: (workspaceId: string, contactId: string) =>
        environment.agenthos.apiUrl +
        '/workspaces/' +
        workspaceId +
        '/contacts/' +
        contactId +
        '/sinisters',
    groupSinisters: (workspaceId: string, groupId: string) =>
        environment.agenthos.apiUrl +
        '/workspaces/' +
        workspaceId +
        '/groups/' +
        groupId +
        '/sinisters',
    partnerSinisters: (workspaceId: string, partnerId: string) =>
        environment.agenthos.apiUrl +
        '/workspaces/' +
        workspaceId +
        '/partners/' +
        partnerId +
        '/sinisters',
    policySinisters: (
        workspaceId: string,
        contactId: string,
        policyId: string
    ) =>
        environment.agenthos.apiUrl +
        '/workspaces/' +
        workspaceId +
        '/contacts/' +
        contactId +
        '/policies/' +
        policyId +
        '/sinisters',
    policySinister: (
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
        sinisterId,
    policySinisterCertificate: (
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
        '/certificate',
    policySinisterDetails: (
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
        '/details',
    policySinisterReport: (
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
        '/report',
    policySinisterTracking: (
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
        '/tracking',
    finalizeSinister: (
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
        '/finalize',
    reactivateSinister: (
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
        '/reactivate',
    reportInsuranceSinisters: (workspaceId: string, insuranceId: number) =>
        environment.agenthos.apiUrl +
        '/workspaces/' +
        workspaceId +
        '/insurances/' +
        insuranceId +
        '/sinisters/reports',
    reportOpenSinisters: (workspaceId: string) =>
        environment.agenthos.apiUrl +
        '/workspaces/' +
        workspaceId +
        '/sinisters/reports/open',
    sinisterEvidence: (
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
        '/evidence',
    sinisterLogs: (
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
        '/logs',
    sinisterExecutives: (
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
        '/executives',
    sinistersStats: (workspaceId: string) =>
        environment.agenthos.apiUrl +
        '/workspaces/' +
        workspaceId +
        '/stats/sinisters',
    workspaceSinisterStats: (workspaceId: string) =>
        environment.agenthos.apiUrl +
        '/workspaces/' +
        workspaceId +
        '/sinisters/stats',
    workspacesInsuranceSinisters: (workspaceId: string, insuranceId: number) =>
        environment.agenthos.apiUrl +
        '/workspaces/' +
        workspaceId +
        '/insurances/' +
        insuranceId +
        '/sinisters',
    workspaceInsuranceSinisterFilters: (
        workspaceId: string,
        insuranceId: number
    ) =>
        environment.agenthos.apiUrl +
        '/workspaces/' +
        workspaceId +
        '/insurances/' +
        insuranceId +
        '/sinisters/filters',
    workspaceInsuranceSinisterStatistics: (
        workspaceId: string,
        insuranceId: number
    ) =>
        environment.agenthos.apiUrl +
        '/workspaces/' +
        workspaceId +
        '/insurances/' +
        insuranceId +
        '/sinisters/statistics',
};

@Injectable()
export class SinisterService {
    private _workspaceId: string = this._authService.workspaceId;

    constructor(
        private _httpClient: HttpClient,
        private _authService: AuthService
    ) {}

    /**
     * Create a sinister from the API
     * @param  contactId   The contact ID
     * @param  policyId    The policy ID
     * @param  requestBody The request body
     * @return             Notice of action done
     */
    createSinister(
        contactId: string,
        policyId: string,
        requestBody: CreateSinister
    ): Observable<HttpResponse> {
        const route: string = routes.policySinisters(
            this._workspaceId,
            contactId,
            policyId
        );
        return this._httpClient.post<HttpResponse>(route, requestBody);
    }

    downloadReportInsuranceSinisters(
        insuranceId: number,
        filters: string = '',
        rangeField: string = '',
        rangeStart: string = '',
        rangeEnd: string = '',
        sortBy: string = '-createdAt',
        specialFilter: string = '',
        formatType: number
    ) {
        const route: string = routes.reportInsuranceSinisters(
            this._workspaceId,
            insuranceId
        );
        let params: HttpParams = new HttpParams();
        if (!!filters) params = params.append('filter', filters);
        if (!!rangeField) params = params.append('rangeField', rangeField);
        if (!!rangeStart) params = params.append('rangeStart', rangeStart);
        if (!!rangeEnd) params = params.append('rangeEnd', rangeEnd);
        if (!!formatType) params = params.append('formatType', formatType);
        if (!!sortBy) params = params.append('sortBy', sortBy);
        if (!!specialFilter)
            params = params.append('specialFilter', specialFilter);
        params.append('observe', 'response');
        params.append('responseType', 'arraybuffer');
        const fileParams: any = {
            observe: 'response',
            responseType: 'arraybuffer',
            params,
        };
        return this._httpClient.get(route, fileParams).toPromise();
    }

    downloadReportOpenSinisters(
        rangeField: string = '',
        rangeStart: string = '',
        rangeEnd: string = '',
        sortBy: string = '-createdAt',
        specialFilter: string = '',
        formatType: number
    ) {
        const route: string = routes.reportOpenSinisters(this._workspaceId);
        let params: HttpParams = new HttpParams();
        if (!!rangeField) params = params.append('rangeField', rangeField);
        if (!!rangeStart) params = params.append('rangeStart', rangeStart);
        if (!!rangeEnd) params = params.append('rangeEnd', rangeEnd);
        if (!!formatType) params = params.append('formatType', formatType);
        if (!!sortBy) params = params.append('sortBy', sortBy);
        if (!!specialFilter)
            params = params.append('specialFilter', specialFilter);
        params.append('observe', 'response');
        params.append('responseType', 'arraybuffer');
        const fileParams: any = {
            observe: 'response',
            responseType: 'arraybuffer',
            params,
        };
        return this._httpClient.get(route, fileParams).toPromise();
    }

    /**
     * Finalize a sinister from the API
     * @param  contactId   The contact ID
     * @param  policyId    The policy ID
     * @param  sinisterId  The sinister ID
     * @param  requestBody The request body
     * @return             Notice of action done
     */
    finalizeSinister(
        contactId: string,
        policyId: string,
        sinisterId: string,
        requestBody: FormData
    ): Observable<void> {
        const route: string = routes.finalizeSinister(
            this._workspaceId,
            contactId,
            policyId,
            sinisterId
        );
        return this._httpClient.post<void>(route, requestBody);
    }

    /**
     * Get the contact sinisters
     * @param  contactId The contact ID
     * @param  page      The page to get
     * @param  fields    The fields to get
     * @param  filter    The filter to apply
     * @param  search    The search to do
     * @return           The contact sinisters
     */
    getContactSinisters(
        contactId: string,
        page: number = 1,
        fields: string = '',
        filters: number[] = [],
        query: string = ''
    ): Observable<HttpResponse> {
        const route: string = routes.contactSinisters(
            this._workspaceId,
            contactId
        );
        let params: HttpParams = new HttpParams();
        params = params.append('page', page.toString());
        if (!!fields) params = params.append('fields', fields);
        if (filters.length > 0)
            params = params.append('filter', this._getFilter(filters));
        if (!!query)
            params = params.append('search', 'sinisterNumber:' + query);
        params = params.append('sortBy', '-createdAt');
        return this._httpClient.get<HttpResponse>(route, { params }).pipe(
            map((res: HttpResponse) => {
                if (fields.includes('lifeTime')) {
                    const sinisters: Sinister[] = res.data.items.map(
                        (sinister: Sinister) => {
                            return this._calculatePolicyLifeTime(sinister);
                        }
                    );
                    res.data.items = sinisters;
                }
                return res;
            })
        );
    }

    /**
     * Get the group sinisters
     * @param  groupId The group ID
     * @param  page      The page to get
     * @param  fields    The fields to get
     * @param  filter    The filter to apply
     * @param  search    The search to do
     * @return           The group sinisters
     */
    getGroupSinisters(
        groupId: string,
        page: number = 1,
        fields: string = '',
        filters: number[] = [],
        query: string = ''
    ): Observable<HttpResponse> {
        const route: string = routes.groupSinisters(this._workspaceId, groupId);
        let params: HttpParams = new HttpParams();
        params = params.append('page', page.toString());
        if (!!fields) params = params.append('fields', fields);
        if (filters.length > 0)
            params = params.append('filter', this._getFilter(filters));
        if (!!query)
            params = params.append('search', 'sinisterNumber:' + query);
        params = params.append('sortBy', '-createdAt');
        return this._httpClient.get<HttpResponse>(route, { params }).pipe(
            map((res: HttpResponse) => {
                if (fields.includes('lifeTime')) {
                    const sinisters: Sinister[] = res.data.items.map(
                        (sinister: Sinister) => {
                            return this._calculatePolicyLifeTime(sinister);
                        }
                    );
                    res.data.items = sinisters;
                }
                return res;
            })
        );
    }

    getSinisterStats(
        filters: string = '',
        rangeField: string = '',
        rangeStart: string = '',
        rangeEnd: string = '',
        specialFilter: string = ''
    ) {
        const route: string = routes.workspaceSinisterStats(this._workspaceId);
        let params: HttpParams = new HttpParams();
        if (!!filters) params = params.append('filter', filters);
        if (!!rangeField) params = params.append('rangeField', rangeField);
        if (!!rangeStart) params = params.append('rangeStart', rangeStart);
        if (!!rangeEnd) params = params.append('rangeEnd', rangeEnd);
        if (!!specialFilter)
            params = params.append('specialFilter', specialFilter);
        return this._httpClient
            .get<HttpResponse>(route, { params })
            .pipe(map((res: HttpResponse) => res.data));
    }

    getInsuranceSinisters(
        insuranceId: number,
        page: number = 1,
        fields: string = '',
        filters: string = '',
        query: string = '',
        sortBy: string = '-sinisterDate',
        rangeField: string = '',
        rangeStart: string = '',
        rangeEnd: string = '',
        specialFilter: string = ''
    ): Observable<HttpResponse> {
        const route: string = routes.workspacesInsuranceSinisters(
            this._workspaceId,
            insuranceId
        );
        let params: HttpParams = new HttpParams();
        params = params.append('page', page.toString());
        if (!!fields) params = params.append('fields', fields);
        if (!!filters) params = params.append('filter', filters);
        if (!!query) params = params.append('search', query);
        if (!!rangeField) params = params.append('rangeField', rangeField);
        if (!!rangeStart) params = params.append('rangeStart', rangeStart);
        if (!!rangeEnd) params = params.append('rangeEnd', rangeEnd);
        if (!!specialFilter)
            params = params.append('specialFilter', specialFilter);
        params = params.append('sortBy', sortBy);
        return this._httpClient.get<HttpResponse>(route, { params }).pipe(
            map((res: HttpResponse) => {
                if (fields.includes('lifeTime')) {
                    const sinisters: Sinister[] = res.data.items.map(
                        (sinister: Sinister) => {
                            return this._calculatePolicyLifeTime(sinister);
                        }
                    );
                    res.data.items = sinisters;
                }
                return res;
            })
        );
    }

    getInsuranceSinisterFilters(
        insuranceId: number,
        filters: string = '',
        rangeField: string = '',
        rangeStart: string = '',
        rangeEnd: string = '',
        specialFilter: string = ''
    ) {
        const route: string = routes.workspaceInsuranceSinisterFilters(
            this._workspaceId,
            insuranceId
        );
        let params: HttpParams = new HttpParams();
        if (!!filters) params = params.append('filter', filters);
        if (!!rangeField) params = params.append('rangeField', rangeField);
        if (!!rangeStart) params = params.append('rangeStart', rangeStart);
        if (!!rangeEnd) params = params.append('rangeEnd', rangeEnd);
        if (!!specialFilter)
            params = params.append('specialFilter', specialFilter);
        return this._httpClient
            .get<HttpResponse>(route, { params })
            .pipe(map((res: HttpResponse) => res.data));
    }

    getInsuranceSinisterStatistics(
        insuranceId: number,
        filters: string = '',
        rangeField: string = '',
        rangeStart: string = '',
        rangeEnd: string = ''
    ) {
        const route: string = routes.workspaceInsuranceSinisterStatistics(
            this._workspaceId,
            insuranceId
        );
        let params: HttpParams = new HttpParams();
        if (!!filters) params = params.append('filter', filters);
        if (!!rangeField) params = params.append('rangeField', rangeField);
        if (!!rangeStart) params = params.append('rangeStart', rangeStart);
        if (!!rangeEnd) params = params.append('rangeEnd', rangeEnd);
        return this._httpClient
            .get<HttpResponse>(route, { params })
            .pipe(map((res: HttpResponse) => res.data));
    }

    /**
     * Get the partner sinisters
     * @param  partnerId The partner ID
     * @param  page      The page to get
     * @param  fields    The fields to get
     * @param  filter    The filter to apply
     * @param  search    The search to do
     * @return           The partner sinisters
     */
    getPartnerSinisters(
        partnerId: string,
        page: number = 1,
        fields: string = '',
        filters: number[] = [],
        query: string = ''
    ): Observable<HttpResponse> {
        const route: string = routes.partnerSinisters(
            this._workspaceId,
            partnerId
        );
        let params: HttpParams = new HttpParams();
        params = params.append('page', page.toString());
        if (!!fields) params = params.append('fields', fields);
        if (filters.length > 0)
            params = params.append('filter', this._getFilter(filters));
        if (!!query)
            params = params.append('search', 'sinisterNumber:' + query);
        params = params.append('sortBy', '-createdAt');
        return this._httpClient.get<HttpResponse>(route, { params }).pipe(
            map((res: HttpResponse) => {
                if (fields.includes('lifeTime')) {
                    const sinisters: Sinister[] = res.data.items.map(
                        (sinister: Sinister) => {
                            return this._calculatePolicyLifeTime(sinister);
                        }
                    );
                    res.data.items = sinisters;
                }
                return res;
            })
        );
    }

    /**
     * Get the policy sinister
     * @param  contactId  The contact ID
     * @param  policyId   The policy ID
     * @param  sinisterId The sinister ID
     * @param  fields     The fields to get
     * @return            The policy sinister
     */
    getPolicySinister(
        contactId: string,
        policyId: string,
        sinisterId: string,
        fields: string = ''
    ): Observable<Sinister> {
        const route: string = routes.policySinister(
            this._workspaceId,
            contactId,
            policyId,
            sinisterId
        );
        let params: HttpParams = new HttpParams();
        if (!!fields) params = params.append('fields', fields);
        return this._httpClient.get<HttpResponse>(route, { params }).pipe(
            map((res: HttpResponse) => {
                const sinister: Sinister = res.data;
                sinister.manager = !!sinister.manager ? sinister.manager : '';
                sinister.internalNumber = !!sinister.internalNumber
                    ? sinister.internalNumber
                    : '';
                sinister.sinisterNumber = !!sinister.sinisterNumber
                    ? sinister.sinisterNumber
                    : '';
                sinister.invoice = !!sinister.invoice ? sinister.invoice : '';
                sinister.certificate = !!sinister.certificate
                    ? sinister.certificate
                    : '';
                sinister.estimatedResolutionDays =
                    !!sinister.sinisterDate &&
                    !!sinister.estimatedResolutionDate
                        ? moment(sinister.estimatedResolutionDate)
                              .diff(moment(sinister.sinisterDate), 'days')
                              .toString()
                        : '';
                sinister.sinisterElapsedDays = !!sinister.sinisterDate
                    ? moment()
                          .diff(moment(sinister.sinisterDate), 'days')
                          .toString()
                    : '';
                sinister.notificationDate = !!sinister.notificationDate
                    ? moment(sinister.notificationDate).format('DD/MM/YYYY')
                    : '';
                sinister.sinisterDate = !!sinister.sinisterDate
                    ? moment(sinister.sinisterDate).format('DD/MM/YYYY')
                    : '';
                sinister.estimatedResolutionDate =
                    !!sinister.estimatedResolutionDate
                        ? moment(sinister.estimatedResolutionDate).format(
                              'DD/MM/YYYY'
                          )
                        : '';
                sinister.sinisterElapsedMinutes =
                    !!sinister.timeReport && !!sinister.timeResponse
                        ? moment(sinister.timeResponse, 'HH:mm:ss')
                              .diff(
                                  moment(sinister.timeReport, 'HH:mm:ss'),
                                  'minutes'
                              )
                              .toString() + ' MIN.'
                        : '';
                sinister.timeReport = !!sinister.timeReport
                    ? moment(sinister.timeReport, 'HH:mm:ss').format('hh:mm A')
                    : '';
                sinister.timeResponse = !!sinister.timeResponse
                    ? moment(sinister.timeResponse, 'HH:mm:ss').format(
                          'hh:mm A'
                      )
                    : '';
                sinister.affectedCoverage = !!sinister.affectedCoverage
                    ? sinister.affectedCoverage
                    : '';
                sinister.affectedName = !!sinister.affectedName
                    ? sinister.affectedName
                    : '';
                sinister.location = !!sinister.location
                    ? sinister.location
                    : !!sinister.latLong
                    ? sinister.latLong
                    : '';
                sinister.sinisterCause = !!sinister.sinisterCause
                    ? sinister.sinisterCause
                    : '';
                sinister.insuranceGroupId = !!sinister.insuranceGroupId
                    ? sinister.insuranceGroupId
                    : 0;
                sinister.workspaceCountryId = !!sinister.workspaceCountryId
                    ? sinister.workspaceCountryId
                    : DEFAULT_PHONE_CODE_ID;
                return sinister;
            })
        );
    }

    /**
     * Get the sinister logs
     * @param  contactId    The contact ID
     * @param  policyId     The policy ID
     * @param  sinisterId   The sinister ID
     * @param  page         The page to get
     * @param  fields       The fields to get
     * @return              The history policy
     */
    getSinisterLogs(
        contactId: string,
        policyId: string,
        sinisterId: string,
        page: number = 1,
        fields: string = '',
        sortBy: string = 'createdAt'
    ): Observable<HttpResponse> {
        const route: string = routes.sinisterLogs(
            this._workspaceId,
            contactId,
            policyId,
            sinisterId
        );
        let params: HttpParams = new HttpParams();
        params = params.append('page', page.toString());
        if (!!fields) params = params.append('fields', fields);
        params = params.append('sortBy', sortBy);
        return this._httpClient.get<HttpResponse>(route, { params });
    }

    getTotalWorkspaceSinisters(
        filters: string = '',
        rangeField: string = '',
        rangeStart: string = '',
        rangeEnd: string = ''
    ): Observable<number> {
        const route: string = routes.totalSinisters(this._workspaceId);
        let params: HttpParams = new HttpParams();
        if (!!filters) params = params.append('filter', filters);
        if (!!rangeField) params = params.append('rangeField', rangeField);
        if (!!rangeStart) params = params.append('rangeStart', rangeStart);
        if (!!rangeEnd) params = params.append('rangeEnd', rangeEnd);
        return this._httpClient
            .get<HttpResponse>(route, { params })
            .pipe(map((res: HttpResponse) => res.data));
    }

    /**
     * Get the sinisters from the API
     * @param  page            The page number
     * @param  fields          The fields to get
     * @param  sinisterStatusId    The filter to apply
     * @param  query           The search to do
     * @return                 The sinisters
     */
    getSinisters(
        page: number = 1,
        fields: string = '',
        filters: string = '',
        query: string = '',
        sortBy: string = '-sinisterDate',
        rangeField: string = '',
        rangeStart: string = '',
        rangeEnd: string = '',
        specialFilter: string = ''
    ): Observable<HttpResponse> {
        const route: string = routes.sinisters(this._workspaceId);
        let params: HttpParams = new HttpParams();
        params = params.append('page', page.toString());
        if (!!fields) params = params.append('fields', fields);
        if (!!filters) params = params.append('filter', filters);
        if (!!query) params = params.append('search', query);
        if (!!rangeField) params = params.append('rangeField', rangeField);
        if (!!rangeStart) params = params.append('rangeStart', rangeStart);
        if (!!rangeEnd) params = params.append('rangeEnd', rangeEnd);
        if (!!specialFilter)
            params = params.append('specialFilter', specialFilter);
        params = params.append('sortBy', sortBy);
        return this._httpClient.get<HttpResponse>(route, { params }).pipe(
            map((res: HttpResponse) => {
                if (fields.includes('lifeTime')) {
                    const sinisters: Sinister[] = res.data.items.map(
                        (sinister: Sinister) => {
                            return this._calculatePolicyLifeTime(sinister);
                        }
                    );
                    res.data.items = sinisters;
                }
                return res;
            })
        );
    }

    /**
     * Reactivate a sinister from the API
     * @param  contactId   The contact ID
     * @param  policyId    The policy ID
     * @param  sinisterId  The sinister ID
     * @param  requestBody The request body
     * @return             Notice of action done
     */
    reactivateSinister(
        contactId: string,
        policyId: string,
        sinisterId: string,
        requestBody: FormData
    ): Observable<void> {
        const route: string = routes.reactivateSinister(
            this._workspaceId,
            contactId,
            policyId,
            sinisterId
        );
        return this._httpClient.post<void>(route, requestBody);
    }

    updatePolicySinisterCertificate(
        sinisterData: SinisterDataSend,
        requestBody: UpdateSinisterCertificateDataSend
    ): Observable<string> {
        const route: string = routes.policySinisterCertificate(
            this._workspaceId,
            sinisterData.contactId,
            sinisterData.policyId,
            sinisterData.sinisterId
        );
        return this._httpClient
            .put<HttpResponse>(route, requestBody)
            .pipe(map((res: HttpResponse) => res.data));
    }

    updatePolicySinisterDetails(
        sinisterData: SinisterDataSend,
        requestBody: UpdateSinisterDetailsDataSend
    ): Observable<void> {
        const route: string = routes.policySinisterDetails(
            this._workspaceId,
            sinisterData.contactId,
            sinisterData.policyId,
            sinisterData.sinisterId
        );
        return this._httpClient.put<void>(route, requestBody);
    }

    updatePolicySinisterEvidence(
        sinisterData: SinisterDataSend,
        requestBody: FormData
    ): Observable<string> {
        const route: string = routes.sinisterEvidence(
            this._workspaceId,
            sinisterData.contactId,
            sinisterData.policyId,
            sinisterData.sinisterId
        );
        return this._httpClient
            .post<HttpResponse>(route, requestBody)
            .pipe(map((res: HttpResponse) => res.data));
    }

    updatePolicySinisterReport(
        sinisterData: SinisterDataSend,
        requestBody: UpdateSinisterReportDataSend
    ): Observable<void> {
        const route: string = routes.policySinisterReport(
            this._workspaceId,
            sinisterData.contactId,
            sinisterData.policyId,
            sinisterData.sinisterId
        );
        return this._httpClient.put<void>(route, requestBody);
    }

    updatePolicySinisterTracking(
        sinisterData: SinisterDataSend,
        requestBody: UpdateSinisterTrackingDataSend
    ): Observable<void> {
        const route: string = routes.policySinisterTracking(
            this._workspaceId,
            sinisterData.contactId,
            sinisterData.policyId,
            sinisterData.sinisterId
        );
        return this._httpClient.put<void>(route, requestBody);
    }

    /**
     * Get the sinisters stats
     * @return         The sinisters stats
     */
    getSinistersStats(): Observable<SinisterStat[]> {
        const route: string = routes.sinistersStats(this._workspaceId);
        return this._httpClient
            .get<HttpResponse>(route)
            .pipe(map((res: HttpResponse) => res.data));
    }

    selectExecutive(
        contactId: string,
        policyId: string,
        sinisterId: string,
        executiveId: string
    ): Observable<HttpResponse> {
        const route: string = routes.sinisterExecutives(
            this._workspaceId,
            contactId,
            policyId,
            sinisterId
        );
        return this._httpClient.post<HttpResponse>(route, { executiveId });
    }

    /**
     * Calculate the life time of the policy
     * @param  policy The policy to evaluate
     * @return        The policy with their life time value
     */
    private _calculatePolicyLifeTime(sinister: Sinister): Sinister {
        let percentage: number;
        const validityStartDate = moment(sinister.validityStartDate);
        const validityEndDate = moment(sinister.validityEndDate);
        const totalDays = validityEndDate.diff(validityStartDate, 'days');
        const daysPassed = moment().diff(validityStartDate, 'days');
        percentage =
            daysPassed >= totalDays
                ? 100
                : Math.round((daysPassed * 100) / totalDays);
        sinister.lifeTime = percentage;
        return sinister;
    }

    /**
     * Get the filter to apply
     * @param  filters The filters to apply
     * @return         The filter
     */
    private _getFilter(filters: number[]): string {
        const filterIds: string[] = filters.map((element: number) => {
            return 'sinisterStatusId[=]' + element;
        });
        return filterIds.join(',');
    }
}
