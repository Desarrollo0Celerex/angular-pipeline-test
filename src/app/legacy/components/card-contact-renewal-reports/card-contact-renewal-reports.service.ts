import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { saveAs } from 'file-saver';

import { POLICY_STATUS } from '@constants/global';
import { UtilitiesHelper } from '@core/helpers/utilities.helper';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { PolicyService } from '@services/policy.service';

@Injectable()
export class CardContactRenewalReportsService {
    loadedContent: boolean = false;
    totalContactAppliedRenewals: number = 0;
    totalContactPendingRenewals: number = 0;

    constructor(private _policyService: PolicyService) {}

    /* downloadReport(contactId: string, rangeStart: string, rangeEnd: string, formatType: number): Promise<void> {
        const filters: string = UtilitiesHelper.generateHttpFilter('policyStatusId', [POLICY_STATUS.ISSUED, POLICY_STATUS.CURRENT, POLICY_STATUS.PENDING, POLICY_STATUS.SUSPENDED, POLICY_STATUS.FINISHED])
        const rangeField: string = 'validityEndDate';
        const sortBy: string = 'validityEndDate';
        switch(this.selectedReportType) {
            case REPORT_TYPES.APPLIED_RENEWALS:
                return this._downloadReportAppliedRenewals(contactId, filters, rangeField, rangeStart, rangeEnd, formatType, sortBy);

            default:
                return this._downloadReportPendingRenewals(contactId, filters, rangeField, rangeStart, rangeEnd, formatType, sortBy);
        }
    } */

    loadTotalRenewals(
        parnerId: string,
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
            this.totalContactAppliedRenewals = res[0].data;
            this.totalContactPendingRenewals = res[1].data;
            this.loadedContent = true;
        });
    }

    /* private _downloadReportAppliedRenewals(contactId: string, filters: string, rangeField: string, rangeStart: string, rangeEnd: string, formatType: number, sortBy: string): Promise<void> {
        return new Promise((resolve) => {
            this._policyService.downloadReportContactAppliedRenewals(contactId, filters, rangeField, rangeStart, rangeEnd, formatType, sortBy).then((response: any) => {
              const filename = response.headers.get('content-disposition').split(';')[1].split('filename')[1].split('=')[1].split('"')[1].trim();
              const blob = new Blob([response.body], {type: response.type.toString()});
                  saveAs(blob, filename);
                  resolve();
            });
        });
    }

    private _downloadReportPendingRenewals(contactId: string, filters: string, rangeField: string, rangeStart: string, rangeEnd: string, formatType: number, sortBy: string): Promise<void> {
        return new Promise((resolve) => {
            this._policyService.downloadReportContactPendingRenewals(contactId, filters, rangeField, rangeStart, rangeEnd, formatType, sortBy).then((response: any) => {
              const filename = response.headers.get('content-disposition').split(';')[1].split('filename')[1].split('=')[1].split('"')[1].trim();
              const blob = new Blob([response.body], {type: response.type.toString()});
                  saveAs(blob, filename);
                  resolve();
            });
        });
    } */

    private _generateRenewalRequests(
        parnerId: string,
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
        const requestTotalContactAppliedRenewals: Observable<HttpResponse> =
            this._policyService.getTotalContactAppliedRenewals(
                parnerId,
                filters,
                rangeField,
                rangeStart,
                rangeEnd
            );
        const requestTotalContactPendingRenewals: Observable<HttpResponse> =
            this._policyService.getTotalContactPendingRenewals(
                parnerId,
                filters,
                rangeField,
                rangeStart,
                rangeEnd
            );
        requests.push(requestTotalContactAppliedRenewals);
        requests.push(requestTotalContactPendingRenewals);
        return forkJoin(requests);
    }
}
