import { Injectable } from '@angular/core';

import { PolicyService } from '@services/policy.service';

@Injectable()
export class AlertUnusualReportedSinistersService {
    reportedSinisters: number = 0;

    constructor(private policyService: PolicyService) { }

    loadReportedSinisters(contactId: string, policyId: string): void {
        this.policyService.getReportedSinisters(contactId, policyId).subscribe((res: number) => {
            this.reportedSinisters = res;
        })
    }
}
