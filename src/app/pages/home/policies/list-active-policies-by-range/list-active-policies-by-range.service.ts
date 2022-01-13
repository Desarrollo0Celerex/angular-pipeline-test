import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';

import { POLICY_STATUS } from '@constants/global';
import { UtilitiesHelper } from '@helpers/utilities.helper';
import { PolicyService } from '@services/policy.service';

@Injectable()
export class ListActivePoliciesByRangeService {

    constructor(private _policyService: PolicyService) { }

    downloadActivePoliciesReport(rangeField: string, rangeStart: string, rangeEnd: string): Promise<void> {
        return new Promise((resolve) => {
            const filters: string = UtilitiesHelper.generateHttpFilter('policyStatusId', [POLICY_STATUS.ISSUED, POLICY_STATUS.CURRENT, POLICY_STATUS.PENDING, POLICY_STATUS.SUSPENDED]);
            const sortBy: string = '-validityEndDate';
            this._policyService.downloadPoliciesReport(filters, rangeField, rangeStart, rangeEnd, sortBy).then((response: any) => {
              const filename = response.headers.get('content-disposition').split(';')[1].split('filename')[1].split('=')[1].split('"')[1].trim();
              const blob = new Blob([response.body], {type: response.type.toString()});
                  saveAs(blob, filename);
                  resolve();
            });
        });
    }
}
