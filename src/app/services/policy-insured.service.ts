import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import * as moment from 'moment';

import { environment } from '@env/environment';
import { HttpResponse } from '@interfaces/http-response.interface';
import { Insured } from '@interfaces/insured.interface';
import { AuthService } from '@services/auth.service';

const ROUTES = {
    policyInsureds: (workspaceId: string, contactId: string, policyId: string) => `${environment.apiUrl}/workspaces/${workspaceId}/contacts/${contactId}/policies/${policyId}/insureds`,
    policyInsured: (workspaceId: string, contactId: string, policyId: string, policyInsuredId: string) => `${environment.apiUrl}/workspaces/${workspaceId}/contacts/${contactId}/policies/${policyId}/insureds/${policyInsuredId}`,
    reportFlotilla: (workspaceId: string, contactId: string, policyId: string) => `${environment.apiUrl}/workspaces/${workspaceId}/contacts/${contactId}/policies/${policyId}/reports/flotilla`,
    reportFlotillas: (workspaceId: string, contactId: string) => `${environment.apiUrl}/workspaces/${workspaceId}/contacts/${contactId}/reports/flotillas`
}

@Injectable()
export class PolicyInsuredService {
    private _workspaceId: string = this._authService.workspaceId;

    constructor(
        private _authService: AuthService,
        private _httpClient: HttpClient
    ) { }

    createPolicyInsured(contactId: string, policyId: string, requestBodies: FormData[]): Observable<void> {
        const route: string = ROUTES.policyInsureds(this._workspaceId, contactId, policyId);
        return from(requestBodies).pipe(
            concatMap(requestBody => <Observable<void>> this._httpClient.post<void>(route, requestBody) )
        )
    }

    deletePolicyInsured(contactId: string, policyId: string, policyInsuredId: string): Observable<void> {
        const route: string = ROUTES.policyInsured(this._workspaceId, contactId, policyId, policyInsuredId);
        return this._httpClient.delete<void>(route);
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
                insured.vehicleNumber = (!!insured.vehicleNumber) ? insured.vehicleNumber : '';
                insured.vehicleInternalNumber = (!!insured.vehicleInternalNumber) ? insured.vehicleInternalNumber : '';
                insured.vehicleSubgroup = (!!insured.vehicleSubgroup) ? insured.vehicleSubgroup : '';
                insured.vehicleType = (!!insured.vehicleType) ? insured.vehicleType : '';
                insured.vehicleUnitType = (!!insured.vehicleUnitType) ? insured.vehicleUnitType : '';
                insured.vehicleCargoTypeName = (!!insured.vehicleCargoTypeName) ? insured.vehicleCargoTypeName : '';
                insured.vehicleCoverageName = (!!insured.vehicleCoverageName) ? insured.vehicleCoverageName : '';
                insured.vehicleUseName = (!!insured.vehicleUseName) ? insured.vehicleUseName : '';
                insured.vehicleAdaptation = (!!insured.vehicleAdaptation) ? insured.vehicleAdaptation : '';
                insured.vehicleValidityStartDate = (!!insured.vehicleValidityStartDate) ? moment(insured.vehicleValidityStartDate, 'YYYY-MM-DD').format('DD/MM/YYYY') : '';
                insured.vehicleNetPay = (!!insured.vehicleNetPay) ? insured.vehicleNetPay : 0.00;
                insured.vehicleFeePay = (!!insured.vehicleFeePay) ? insured.vehicleFeePay : 0.00;
                insured.vehicleCoverPay = (!!insured.vehicleCoverPay) ? insured.vehicleCoverPay : 0.00;
                insured.vehicleTaxPay = (!!insured.vehicleTaxPay) ? insured.vehicleTaxPay : 0.00;
                insured.vehicleTotalAmount = (!!insured.vehicleTotalAmount) ? insured.vehicleTotalAmount : 0.00;
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

    getPolicyInsureds(contactId: string, policyId: string, fields: string): Observable<Insured[]> {
        const route: string = ROUTES.policyInsureds(this._workspaceId, contactId, policyId);
        let params: HttpParams = new HttpParams();
        if(!!fields) params = params.append('fields', fields);
        return this._httpClient.get<HttpResponse>(route, { params }).pipe(
            map((res: HttpResponse) => res.data.items)
        );
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
}
