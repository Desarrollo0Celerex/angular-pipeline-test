import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { HttpResponse } from '@interfaces/http-response.interface';
import { PolicyStatus } from '@interfaces/policy-status.interface';
import { PolicyStatusService } from '@services/policy-status.service';

@Injectable()
export class ModalSelectPolicyStatusService {
    policyStatus: PolicyStatus[];

    constructor(private _policyStatusService: PolicyStatusService) {
        this.policyStatus = [];
    }

    /**
     * Get the policy status name
     * @param  contentSubtype The content subtype
     * @return                The policy status name
     */
    getPolicyStatusName(contentSubtype: number): string {
        const policyStatus: PolicyStatus | undefined = this.policyStatus.find( (element: PolicyStatus) => element.policyStatusId === contentSubtype)
        return (!!policyStatus) ? policyStatus.name : '';
    }

    /**
     * Load the policy status
     * @return Notice of action done
     */
    loadPolicyStatus(): Observable<void> {
        return this._policyStatusService.getPolicyStatus().pipe(
            tap((res: HttpResponse) => {
                this.policyStatus = res.data;
            }),
            map( () => { })
        )
    }
}
