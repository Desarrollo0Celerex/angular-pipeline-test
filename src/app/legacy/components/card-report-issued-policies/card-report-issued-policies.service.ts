import { Injectable } from '@angular/core';
import { PolicyService } from '@services/policy.service';
import { saveAs } from 'file-saver';

@Injectable()
export class CardReportIssuedPoliciesService {
    constructor(private _policyService: PolicyService) {}

    downloadReport(
        rangeStart: string,
        rangeEnd: string,
        specialFilter: string,
        formatType: number
    ): Promise<void> {
        return new Promise((resolve) => {
            this._policyService
                .downloadReportIssuedPolicies(
                    rangeStart,
                    rangeEnd,
                    specialFilter,
                    formatType
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
}
