import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';

import { POLICY_STATUS } from '@constants/global';
import { UtilitiesHelper } from '@helpers/utilities.helper';
import { PolicyService } from '@services/policy.service';

@Injectable()
export class CardReportContactAppliedRenewalsService {

    constructor(private _policyService: PolicyService) { }

    downloadReport(contactId: string, rangeField: string, rangeStart: string, rangeEnd: string, formatType: number): Promise<void> {
        const filters: string = UtilitiesHelper.generateHttpFilter('policyStatusId', [POLICY_STATUS.ISSUED, POLICY_STATUS.CURRENT, POLICY_STATUS.PENDING, POLICY_STATUS.SUSPENDED, POLICY_STATUS.FINISHED])
        const sortBy: string = 'validityEndDate';
        return new Promise((resolve) => {
            this._policyService.downloadReportContactAppliedRenewals(contactId, filters, rangeField, rangeStart, rangeEnd, formatType, sortBy).then((response: any) => {
              const filename = response.headers.get('content-disposition').split(';')[1].split('filename')[1].split('=')[1].split('"')[1].trim();
              const blob = new Blob([response.body], {type: response.type.toString()});
                  saveAs(blob, filename);
                  resolve();
            });
        });
    }
}
