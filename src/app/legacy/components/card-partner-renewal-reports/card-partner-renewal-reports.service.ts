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

@Injectable()
export class CardPartnerRenewalReportsService {
    REPORT_TYPES: any = REPORT_TYPES;
    loadedContent: boolean = false;
    selectedReportType: number = REPORT_TYPES.PENDING_RENEWALS;
    totalPartnerAppliedRenewals: number = 0;
    totalPartnerPendingRenewals: number = 0;

    constructor(private _policyService: PolicyService) {}

    downloadReport(
        partnerId: number,
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
                    partnerId,
                    filters,
                    rangeField,
                    rangeStart,
                    rangeEnd,
                    formatType,
                    sortBy
                );

            default:
                return this._downloadReportPendingRenewals(
                    partnerId,
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
        parnerId: number,
        rangeStart: string,
        rangeEnd: string
    ): void {
        this.loadedContent = false;
        const rangeField: string = 'validityEndDate';
        const renewalRequests: Observable<HttpResponse[]> =
            this._generateRenewalRequests(
                parnerId,
                rangeField,
                rangeStart,
                rangeEnd
            );
        renewalRequests.subscribe((res: HttpResponse[]) => {
            this.totalPartnerAppliedRenewals = res[0].data;
            this.totalPartnerPendingRenewals = res[1].data;
            this.loadedContent = true;
        });
    }

    private _downloadReportAppliedRenewals(
        partnerId: number,
        filters: string,
        rangeField: string,
        rangeStart: string,
        rangeEnd: string,
        formatType: number,
        sortBy: string
    ): Promise<void> {
        return new Promise((resolve) => {
            this._policyService
                .downloadReportPartnerAppliedRenewals(
                    partnerId,
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
        partnerId: number,
        filters: string,
        rangeField: string,
        rangeStart: string,
        rangeEnd: string,
        formatType: number,
        sortBy: string
    ): Promise<void> {
        return new Promise((resolve) => {
            this._policyService
                .downloadReportPartnerPendingRenewals(
                    partnerId,
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
        parnerId: number,
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
        const requestTotalPartnerAppliedRenewals: Observable<HttpResponse> =
            this._policyService.getTotalPartnerAppliedRenewals(
                parnerId,
                filters,
                rangeField,
                rangeStart,
                rangeEnd
            );
        const requestTotalPartnerPendingRenewals: Observable<HttpResponse> =
            this._policyService.getTotalPartnerPendingRenewals(
                parnerId,
                filters,
                rangeField,
                rangeStart,
                rangeEnd
            );
        requests.push(requestTotalPartnerAppliedRenewals);
        requests.push(requestTotalPartnerPendingRenewals);
        return forkJoin(requests);
    }
}
