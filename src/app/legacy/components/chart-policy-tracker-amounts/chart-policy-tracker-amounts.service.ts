import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { HttpResponse } from '@core/interfaces/http-response.interface';
import { PolicyService } from '@services/policy.service';
import { WorkspaceService } from '@core/services/workspace/workspace.service';
import { Workspace } from '@core/interfaces/workspace.interface';

@Injectable()
export class ChartPolicyTrackerAmountsService {
    amounts: any[] = [];
    workspaceCurrencyName: string = '';

    constructor(
        private _policyService: PolicyService,
        private _workspaceService: WorkspaceService
    ) {}

    loadWorkspaceCurrencyName(): Observable<void> {
        const fields: string = 'currencyName';
        return this._workspaceService.getWorkspace(fields).pipe(
            tap((res: Workspace) => {
                this.workspaceCurrencyName = res.currencyName;
            }),
            map(() => {})
        );
    }

    loadPolicyTrackerAmounts(
        contactId: string,
        policyId: string
    ): Observable<void> {
        return this._policyService
            .getPolicyTrackerAmounts(contactId, policyId)
            .pipe(
                tap((res: HttpResponse) => {
                    this.amounts = res.data;
                    this.amounts.unshift([
                        'AÑO',
                        'Prima Total (' + this.workspaceCurrencyName + ')',
                    ]);
                }),
                map(() => {})
            );
    }
}
