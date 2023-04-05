import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import * as moment from 'moment';

import { DEFAULT_PAGE, DEFAULT_PER_PAGE, POLICY_INSURED_STATUS } from '@constants/global';
import { environment } from '@env/environment';
import { AnalizeInsuredsResponse } from '@interfaces/analize-insureds-response.interface';
import { HttpResponse } from '@interfaces/http-response.interface';
import { Insured } from '@interfaces/insured.interface';
import { UpdatePolicyInsuredStatus } from '@interfaces/update-policy-insured-status.interface';
import { AuthService } from '@services/auth.service';

const ROUTES = {
    policyInsureds: (workspaceId: string, contactId: string, policyId: string) => `${environment.apiUrl}/workspaces/${workspaceId}/contacts/${contactId}/policies/${policyId}/insureds`,
    policyInsured: (workspaceId: string, contactId: string, policyId: string, policyInsuredId: string) => `${environment.apiUrl}/workspaces/${workspaceId}/contacts/${contactId}/policies/${policyId}/insureds/${policyInsuredId}`,
    policyInsuredStatus: (workspaceId: string, contactId: string, policyId: string, policyInsuredId: string) => `${environment.apiUrl}/workspaces/${workspaceId}/contacts/${contactId}/policies/${policyId}/insureds/${policyInsuredId}/status`,
    reportFlotilla: (workspaceId: string, contactId: string, policyId: string) => `${environment.apiUrl}/workspaces/${workspaceId}/contacts/${contactId}/policies/${policyId}/reports/flotilla`,
    reportFlotillas: (workspaceId: string, contactId: string) => `${environment.apiUrl}/workspaces/${workspaceId}/contacts/${contactId}/reports/flotillas`
}

const ROUTES_IMPORTER = {
    analyzeInsureds: (workspaceId: string, contactId: string, policyId: string) => `${environment.importerApiUrl}/workspaces/${workspaceId}/contacts/${contactId}/policies/${policyId}/insured-actions/analyze`,
    downloadErrors: (workspaceId: string, contactId: string, policyId: string) => `${environment.importerApiUrl}/workspaces/${workspaceId}/contacts/${contactId}/policies/${policyId}/insured-actions/errors`,
    exportInsureds: (workspaceId: string, contactId: string, policyId: string) => `${environment.importerApiUrl}/workspaces/${workspaceId}/contacts/${contactId}/policies/${policyId}/insured-actions/export`,
    importInsureds: (workspaceId: string, contactId: string, policyId: string) => `${environment.importerApiUrl}/workspaces/${workspaceId}/contacts/${contactId}/policies/${policyId}/insured-actions/import`,
}

@Injectable()
export class PolicyInsuredService {
    private _workspaceId: string = this._authService.workspaceId;

    constructor(
        private _authService: AuthService,
        private _httpClient: HttpClient
    ) { }

    analyzeInsureds(contactId: string, policyId: string, requestBody: FormData): Observable<AnalizeInsuredsResponse> {
        const route: string = ROUTES_IMPORTER.analyzeInsureds(this._workspaceId, contactId, policyId);
        return this._httpClient.post<HttpResponse>(route, requestBody).pipe(
            map((res: HttpResponse) => res.data)
        );
    }

    createPolicyInsured(contactId: string, policyId: string, requestBody: FormData): Observable<void> {
        const route: string = ROUTES.policyInsureds(this._workspaceId, contactId, policyId);
        return this._httpClient.post<void>(route, requestBody);
    }

    createPolicyInsureds(contactId: string, policyId: string, requestBodies: FormData[]): Observable<void> {
        const route: string = ROUTES.policyInsureds(this._workspaceId, contactId, policyId);
        return from(requestBodies).pipe(
            concatMap(requestBody => <Observable<void>> this._httpClient.post<void>(route, requestBody) )
        )
    }

    deletePolicyInsured(contactId: string, policyId: string, policyInsuredId: string): Observable<void> {
        const route: string = ROUTES.policyInsured(this._workspaceId, contactId, policyId, policyInsuredId);
        return this._httpClient.delete<void>(route);
    }

    downloadErrorsFile(contactId: string, policyId: string, requestBody: FormData) {
        const route: string = ROUTES_IMPORTER.downloadErrors(this._workspaceId, contactId, policyId);
        let params: HttpParams = new HttpParams();
        params.append('observe', 'response');
        params.append('responseType', 'arraybuffer');
        const fileParams: any = {
            observe: 'response',
            responseType: 'arraybuffer',
            params
        };
        return this._httpClient.post(route, requestBody, fileParams).toPromise();
    }

    downloadReportFlotilla(contactId: string, policyId: string, formatType: number) {
        const route: string = ROUTES.reportFlotilla(this._workspaceId, contactId, policyId);
        let params: HttpParams = new HttpParams();
        if(!!formatType) params = params.append('formatType', formatType);
        params.append('observe', 'response');
        params.append('responseType', 'arraybuffer');
        const fileParams: any = {
            observe: 'response',
            responseType: 'arraybuffer',
            params
        };
        return this._httpClient.get(route, fileParams).toPromise();
    }

    downloadReportFlotillas(contactId: string, formatType: number) {
        const route: string = ROUTES.reportFlotillas(this._workspaceId, contactId);
        let params: HttpParams = new HttpParams();
        if(!!formatType) params = params.append('formatType', formatType);
        params.append('observe', 'response');
        params.append('responseType', 'arraybuffer');
        const fileParams: any = {
            observe: 'response',
            responseType: 'arraybuffer',
            params
        };
        return this._httpClient.get(route, fileParams).toPromise();
    }

    exportInsureds(contactId: string, policyId: string) {
        const route: string = ROUTES_IMPORTER.exportInsureds(this._workspaceId, contactId, policyId);
        let params: HttpParams = new HttpParams();
        params.append('observe', 'response');
        params.append('responseType', 'arraybuffer');
        const fileParams: any = {
            observe: 'response',
            responseType: 'arraybuffer',
            params
        };
        return this._httpClient.get(route, fileParams).toPromise();
    }

    getPolicyInsured(contactId: string, policyId: string, policyInsuredId: string, fields: string): Observable<Insured> {
        const route: string = ROUTES.policyInsured(this._workspaceId, contactId, policyId, policyInsuredId);
        let params: HttpParams = new HttpParams();
        if(!!fields) params = params.append('fields', fields);
        return this._httpClient.get<HttpResponse>(route, { params }).pipe(
            map((res: HttpResponse) => {
                const insured: Insured = res.data;
                insured.personName = (!!insured.personName) ? insured.personName : '';
                insured.personGenderName = (!!insured.personGenderName) ? insured.personGenderName : '';
                insured.personAge = (!!insured.personAge) ? insured.personAge : '';
                insured.vehicleMaker = (!!insured.vehicleMaker) ? insured.vehicleMaker : '';
                insured.vehicleVersion = (!!insured.vehicleVersion) ? insured.vehicleVersion : '';
                insured.vehicleModel = (!!insured.vehicleModel) ? insured.vehicleModel : '';
                insured.vehiclePlates = (!!insured.vehiclePlates) ? insured.vehiclePlates : '';
                insured.vehicleSerial = (!!insured.vehicleSerial) ? insured.vehicleSerial : '';
                insured.vehicleMotor = (!!insured.vehicleMotor) ? insured.vehicleMotor : '';
                insured.certificate = (!!insured.certificate) ? insured.certificate : '';
                insured.vehicleInternalNumber = (!!insured.vehicleInternalNumber) ? insured.vehicleInternalNumber : '';
                insured.vehicleSubgroup = (!!insured.vehicleSubgroup) ? insured.vehicleSubgroup : '';
                insured.vehicleType = (!!insured.vehicleType) ? insured.vehicleType : '';
                insured.vehicleUnitType = (!!insured.vehicleUnitType) ? insured.vehicleUnitType : '';
                insured.vehicleCargoTypeName = (!!insured.vehicleCargoTypeName) ? insured.vehicleCargoTypeName : '';
                insured.vehicleCoverageName = (!!insured.vehicleCoverageName) ? insured.vehicleCoverageName : '';
                insured.vehicleUseName = (!!insured.vehicleUseName) ? insured.vehicleUseName : '';
                insured.vehicleAdaptation = (!!insured.vehicleAdaptation) ? insured.vehicleAdaptation : '';
                insured.validityStartDate = (!!insured.validityStartDate) ? moment(insured.validityStartDate, 'YYYY-MM-DD').format('DD/MM/YYYY') : '';
                insured.validityEndDate = (!!insured.validityEndDate) ? moment(insured.validityEndDate, 'YYYY-MM-DD').format('DD/MM/YYYY') : '';
                insured.netPay = (!!insured.netPay) ? insured.netPay : 0.00;
                insured.feePay = (!!insured.feePay) ? insured.feePay : 0.00;
                insured.coverPay = (!!insured.coverPay) ? insured.coverPay : 0.00;
                insured.taxPay = (!!insured.taxPay) ? insured.taxPay : 0.00;
                insured.totalAmount = (!!insured.totalAmount) ? insured.totalAmount : 0.00;
                insured.vehicleStatusName = (!!insured.vehicleStatusName) ? insured.vehicleStatusName : '';
                insured.buildingName = (!!insured.buildingName) ? insured.buildingName : '';
                insured.buildingUsage = (!!insured.buildingUsage) ? insured.buildingUsage : '';
                insured.objectName = (!!insured.objectName) ? insured.objectName : '';
                insured.objectUsage = (!!insured.objectUsage) ? insured.objectUsage : '';
                insured.objectDescription = (!!insured.objectDescription) ? insured.objectDescription : '';
                insured.policyDetails = (!!insured.policyDetails) ? insured.policyDetails : '';
                return insured;
            })
        );
    }

    getPolicyInsureds(contactId: string, policyId: string, fields: string, page: number = DEFAULT_PAGE, perPage: number = DEFAULT_PER_PAGE, sortBy: string = 'insuredNumber', query: string = ''): Observable<HttpResponse> {
        const route: string = ROUTES.policyInsureds(this._workspaceId, contactId, policyId);
        let params: HttpParams = new HttpParams();
        if(!!fields) params = params.append('fields', fields);
        if(!!query) params = params.append('search', query);
        params = params.append('page', page);
        params = params.append('perPage', perPage);
        params = params.append('sortBy', sortBy);
        return this._httpClient.get<HttpResponse>(route, { params }).pipe(
            map((res: HttpResponse) => {
                if(fields.includes('lifeTime')) {
                    for(let i in res.data.items) {
                        res.data.items[i].lifeTime = this._calculateLifeTime(res.data.items[i].insuranceTypeId, res.data.items[i].validityStartDate, res.data.items[i].validityEndDate);
                    }
                }
                return res;
            })
        );
    }

    importInsureds(contactId: string, policyId: string, requestBody: FormData): Observable<void> {
        const route: string = ROUTES_IMPORTER.importInsureds(this._workspaceId, contactId, policyId);
        return this._httpClient.post<void>(route, requestBody);
    }

    updatePolicyInsuredStatus(contactId: string, policyId: string, policyInsuredId: string, requestBody: UpdatePolicyInsuredStatus): Observable<void> {
        const route: string = ROUTES.policyInsuredStatus(this._workspaceId, contactId, policyId, policyInsuredId);
        return this._httpClient.put<void>(route, requestBody);
    }

    updatePolicyInsured(contactId: string, policyId: string, policyInsuredId: string, requestBody: FormData): Observable<void> {
        const route: string = ROUTES.policyInsured(this._workspaceId, contactId, policyId, policyInsuredId);
        return <Observable<void>> this._httpClient.post<void>(route, requestBody);
    }

    updatePolicyInsureds(contactId: string, policyId: string, requestBodies: FormData[]): Observable<void> {
        return from(requestBodies).pipe(
            concatMap((requestBody: FormData) => {
                const policyInsuredId: string = requestBody.get('policyInsuredId')!.toString();
                const route: string = ROUTES.policyInsured(this._workspaceId, contactId, policyId, policyInsuredId);
                return <Observable<void>> this._httpClient.post<void>(route, requestBody);
            })
        )
    }

    private _calculateLifeTime(insuredStatusId: number, validityStartDate: string, validityEndDate: string): number {
        let percentage: number;
        switch(insuredStatusId) {
            case POLICY_INSURED_STATUS.CANCELLED:
                percentage = 100;
            break;

            default:
                if(!!validityStartDate && !!validityEndDate) {
                    const validityStartDateAux = moment(validityStartDate);
                    const validityEndDateAux = moment(validityEndDate);
                    const totalDays = validityEndDateAux.diff(validityStartDateAux, 'days');
                    const daysPassed = moment().diff(validityStartDateAux, 'days');
                    percentage = (daysPassed >= totalDays) ? 100 : Math.round(daysPassed * 100 / totalDays);
                } else {
                    percentage = 0;
                }
                
        }
        return percentage;
    }
}
