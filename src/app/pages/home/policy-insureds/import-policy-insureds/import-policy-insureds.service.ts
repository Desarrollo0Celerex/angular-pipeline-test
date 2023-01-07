import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
import { Observable } from 'rxjs';

import { AnalizeInsuredsResponse } from '@interfaces/analize-insureds-response.interface';
import { PolicyInsuredService } from '@services/policy-insured.service';

@Injectable()
export class ImportPolicyInsuredsService {

    constructor(private _policyInsuredService: PolicyInsuredService) { }

    analyzeInsureds(contactId: string, policyId: string, file: File): Observable<AnalizeInsuredsResponse> {
        const requestBody: FormData = new FormData();
        requestBody.append('insuredsFile', file);
        return this._policyInsuredService.analyzeInsureds(contactId, policyId, requestBody);
    }

    downloadErrorsFile(contactId: string, policyId: string, file: File): Promise<void> {
        return new Promise((resolve) => {
            const requestBody: FormData = new FormData();
            requestBody.append('insuredsFile', file);
            this._policyInsuredService.downloadErrorsFile(contactId, policyId, requestBody).then((response: any) => {
              const filename = response.headers.get('content-disposition').split(';')[1].split('filename')[1].split('=')[1].split('"')[1].trim();
              const blob = new Blob([response.body], {type: response.type.toString()});
                  saveAs(blob, filename);
                  resolve();
            });
        });
    }

    exportInsureds(contactId: string, policyId: string): Promise<void> {
        return new Promise((resolve) => {
            this._policyInsuredService.exportInsureds(contactId, policyId).then((response: any) => {
              const filename = response.headers.get('content-disposition').split(';')[1].split('filename')[1].split('=')[1].split('"')[1].trim();
              const blob = new Blob([response.body], {type: response.type.toString()});
                  saveAs(blob, filename);
                  resolve();
            });
        });
    }

    importInsureds(contactId: string, policyId: string, file: File): Observable<void> {
        const requestBody: FormData = new FormData();
        requestBody.append('insuredsFile', file);
        return this._policyInsuredService.importInsureds(contactId, policyId, requestBody);
    }
}
