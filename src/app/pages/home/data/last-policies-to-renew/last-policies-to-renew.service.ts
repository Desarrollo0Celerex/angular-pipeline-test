import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';

import { POLICY_STATUS } from '@constants/global';
import { UtilitiesHelper } from '@helpers/utilities.helper';
import { PolicyService } from '@services/policy.service';

@Injectable()
export class LastPoliciesToRenewService {

    constructor(private _policyService: PolicyService) { }

    downloadRenewalsReport(rangeField: string, rangeStart: string, rangeEnd: string): Promise<void> {
        console.log('Paso 1')
        return new Promise((resolve) => {
            const filters: string = UtilitiesHelper.generateHttpFilter('policyStatusId', [POLICY_STATUS.ISSUED, POLICY_STATUS.CURRENT, POLICY_STATUS.PENDING, POLICY_STATUS.SUSPENDED, POLICY_STATUS.FINISHED])
            const sortBy: string = 'validityEndDate';
            console.log('Paso 2')
            this._policyService.downloadRenewalsReport(filters, rangeField, rangeStart, rangeEnd, sortBy).then((response: any) => {
              const filename = response.headers.get('content-disposition').split(';')[1].split('filename')[1].split('=')[1].split('"')[1].trim();
              const blob = new Blob([response.body], {type: response.type.toString()});
                    console.log('Paso 3')
                  saveAs(blob, filename);
                  resolve();
                  console.log('Paso 4')
            });
        });
    }
}
