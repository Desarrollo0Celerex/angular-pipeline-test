import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { HttpResponse } from '@interfaces/http-response.interface';
import { PolicyService } from '@services/policy.service';

@Injectable()
export class ChartPolicyTrackerInsurersService {
    insurers: any[] = [];

    constructor(private _policyService: PolicyService) { }

    loadPolicyTrackerInsurers(contactId: string, policyId: string): Observable<void> {
        return this._policyService.getPolicyTrackerInsurers(contactId, policyId).pipe(
            tap((res: HttpResponse) => {
                this.insurers = res.data;
            }),
            map(() => { })
        )
    }
}
