import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { HttpResponse } from '@interfaces/http-response.interface';
import { PolicyService } from '@services/policy.service';
import { WorkspaceService } from '@services/workspace.service';

@Injectable()
export class ChartPolicyTrackerAmountsService {
    amounts: any[] = [];
    workspaceCurrencyName: string = '';

    constructor(
        private _policyService: PolicyService,
        private _workspaceService: WorkspaceService,
    ) { }

    loadWorkspaceCurrencyName(): Observable<void> {
        const fields: string = 'currencyName';
        return this._workspaceService.getWorkspace(fields).pipe(
            tap((res: HttpResponse) => {
                this.workspaceCurrencyName = res.data.currencyName;
            }),
            map(() => { })
        )
    }

    loadPolicyTrackerAmounts(contactId: string, policyId: string): Observable<void> {
        return this._policyService.getPolicyTrackerAmounts(contactId, policyId).pipe(
            tap((res: HttpResponse) => {
                this.amounts = res.data;
                this.amounts.unshift(['AÑO', 'Prima Total ('+this.workspaceCurrencyName+')']);
            }),
            map(() => { })
        )
    }
}
