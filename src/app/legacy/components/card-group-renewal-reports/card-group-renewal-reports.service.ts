import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { saveAs } from 'file-saver';

import { POLICY_STATUS } from '@constants/global';
import { UtilitiesHelper } from '@core/helpers/utilities.helper';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { PolicyService } from '@services/policy.service';

const REPORT_TYPES: any = {
    APPLIED_RENEWALS: 1,
    PENDING_RENEWALS: 2,
};

@Injectable({
    providedIn: 'root',
})
export class CardGroupRenewalReportsService {
    REPORT_TYPES: any = REPORT_TYPES;
    loadedContent: boolean = false;
    selectedReportType: number = REPORT_TYPES.PENDING_RENEWALS;
    totalGroupAppliedRenewals: number = 0;
    totalGroupPendingRenewals: number = 0;

    constructor(private _policyService: PolicyService) {}

    downloadReport(
        groupId: string,
        rangeStart: string,
        rangeEnd: string,
        formatType: number
    ): Promise<void> {
        const filters: string = UtilitiesHelper.generateHttpFilter(
            'policyStatusId',
            [
                POLICY_STATUS.ISSUED,
                POLICY_STATUS.CURRENT,
                POLICY_STATUS.PENDING,
                POLICY_STATUS.SUSPENDED,
                POLICY_STATUS.FINISHED,
            ]
        );
        const rangeField: string = 'validityEndDate';
        const sortBy: string = 'validityEndDate';
        switch (this.selectedReportType) {
            case REPORT_TYPES.APPLIED_RENEWALS:
                return this._downloadReportAppliedRenewals(
                    groupId,
                    filters,
                    rangeField,
                    rangeStart,
                    rangeEnd,
                    formatType,
                    sortBy
                );

            default:
                return this._downloadReportPendingRenewals(
                    groupId,
                    filters,
                    rangeField,
                    rangeStart,
                    rangeEnd,
                    formatType,
                    sortBy
                );
        }
    }

    loadTotalRenewals(
        groupId: string,
        rangeStart: string,
        rangeEnd: string
    ): void {
        this.loadedContent = false;
        const rangeField: string = 'validityEndDate';
        const renewalRequests: Observable<HttpResponse[]> =
            this._generateRenewalRequests(
                groupId,
                rangeField,
                rangeStart,
                rangeEnd
            );
        renewalRequests.subscribe((res: HttpResponse[]) => {
            this.totalGroupAppliedRenewals = res[0].data;
            this.totalGroupPendingRenewals = res[1].data;
            this.loadedContent = true;
        });
    }

    private _downloadReportAppliedRenewals(
        groupId: string,
        filters: string,
        rangeField: string,
        rangeStart: string,
        rangeEnd: string,
        formatType: number,
        sortBy: string
    ): Promise<void> {
        return new Promise((resolve) => {
            this._policyService
                .downloadReportGroupAppliedRenewals(
                    groupId,
                    filters,
                    rangeField,
                    rangeStart,
                    rangeEnd,
                    formatType,
                    sortBy
                )
                .then((response: any) => {
                    const filename = response.headers
                        .get('content-disposition')
                        .split(';')[1]
                        .split('filename')[1]
                        .split('=')[1]
                        .split('"')[1]
                        .trim();
                    const blob = new Blob([response.body], {
                        type: response.type.toString(),
                    });
                    saveAs(blob, filename);
                    resolve();
                });
        });
    }

    private _downloadReportPendingRenewals(
        groupId: string,
        filters: string,
        rangeField: string,
        rangeStart: string,
        rangeEnd: string,
        formatType: number,
        sortBy: string
    ): Promise<void> {
        return new Promise((resolve) => {
            this._policyService
                .downloadReportGroupPendingRenewals(
                    groupId,
                    filters,
                    rangeField,
                    rangeStart,
                    rangeEnd,
                    formatType,
                    sortBy
                )
                .then((response: any) => {
                    const filename = response.headers
                        .get('content-disposition')
                        .split(';')[1]
                        .split('filename')[1]
                        .split('=')[1]
                        .split('"')[1]
                        .trim();
                    const blob = new Blob([response.body], {
                        type: response.type.toString(),
                    });
                    saveAs(blob, filename);
                    resolve();
                });
        });
    }

    private _generateRenewalRequests(
        groupId: string,
        rangeField: string,
        rangeStart: string,
        rangeEnd: string
    ): Observable<HttpResponse[]> {
        const filters: string = UtilitiesHelper.generateHttpFilter(
            'policyStatusId',
            [
                POLICY_STATUS.ISSUED,
                POLICY_STATUS.CURRENT,
                POLICY_STATUS.PENDING,
                POLICY_STATUS.SUSPENDED,
                POLICY_STATUS.FINISHED,
            ]
        );
        let requests: Observable<HttpResponse>[] = [];
        const requestTotalGroupAppliedRenewals: Observable<HttpResponse> =
            this._policyService.getTotalGroupAppliedRenewals(
                groupId,
                filters,
                rangeField,
                rangeStart,
                rangeEnd
            );
        const requestTotalGroupPendingRenewals: Observable<HttpResponse> =
            this._policyService.getTotalGroupPendingRenewals(
                groupId,
                filters,
                rangeField,
                rangeStart,
                rangeEnd
            );
        requests.push(requestTotalGroupAppliedRenewals);
        requests.push(requestTotalGroupPendingRenewals);
        return forkJoin(requests);
    }
}
