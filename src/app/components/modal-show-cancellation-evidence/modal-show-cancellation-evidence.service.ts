import { Injectable } from '@angular/core';

import { HttpResponse } from '@interfaces/http-response.interface';
import { CancelledPolicyService } from '@services/cancelled-policy.service';

@Injectable()
export class ModalShowCancellationEvidenceService {
    evidenceUrl: string = '';

    constructor(private _cancelledPolicyService: CancelledPolicyService) { }

    loadEvidenceUrl(cancelledPolicyId: string): void {
        const fields: string = 'evidenceUrl';
        this._cancelledPolicyService.getCancelledPolicy(cancelledPolicyId, fields).subscribe((res: HttpResponse) => {
            this.evidenceUrl = res.data.evidenceUrl;
        });
    }
}
