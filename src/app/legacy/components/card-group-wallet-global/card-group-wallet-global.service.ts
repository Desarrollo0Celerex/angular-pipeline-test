import { Injectable } from '@angular/core';

import { Group } from '@interfaces/group.interface';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { GroupService } from '@services/group.service';

@Injectable()
export class CardGroupWalletGlobalService {
    group: Group | null = null;

    constructor(private _groupService: GroupService) {}

    loadGroup(groupId: string): void {
        const fields: string =
            'totalGlobalCurrentWallet,totalActivePolicies,totalExpiredPolicies,totalCancelledPolicies,currencyName';
        this._groupService
            .getGroup(groupId, fields)
            .subscribe((res: HttpResponse) => {
                this.group = res.data;
            });
    }
}
