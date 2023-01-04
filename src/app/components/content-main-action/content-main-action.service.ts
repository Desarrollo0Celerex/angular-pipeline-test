import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';

import { PolicyInsuredService } from '@services/policy-insured.service';

@Injectable()
export class ContentMainActionService {

    constructor(private _policyInsuredService: PolicyInsuredService) { }

    downloadReportFlotilla(contactId: string, policyId: string, formatType: number): Promise<void> {
        return new Promise((resolve) => {
            this._policyInsuredService.downloadReportFlotilla(contactId, policyId, formatType).then((response: any) => {
              const filename = response.headers.get('content-disposition').split(';')[1].split('filename')[1].split('=')[1].split('"')[1].trim();
              const blob = new Blob([response.body], {type: response.type.toString()});
                  saveAs(blob, filename);
                  resolve();
            });
        });
    }
}
