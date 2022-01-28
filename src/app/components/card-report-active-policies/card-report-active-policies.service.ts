import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';

import { PolicyService } from '@services/policy.service';

@Injectable()
export class CardReportActivePoliciesService {
    constructor(private _policyService: PolicyService) { }

    downloadReport(rangeStart: string, rangeEnd: string): Promise<void> {
        return new Promise((resolve) => {
            this._policyService.downloadReportActivePolicies(rangeStart, rangeEnd).then((response: any) => {
              const filename = response.headers.get('content-disposition').split(';')[1].split('filename')[1].split('=')[1].split('"')[1].trim();
              const blob = new Blob([response.body], {type: response.type.toString()});
                  saveAs(blob, filename);
                  resolve();
            });
        });
    }
}
