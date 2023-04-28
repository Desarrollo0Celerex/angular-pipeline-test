import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Group } from '@interfaces/group.interface';
import { HttpResponse } from '@interfaces/http-response.interface';
import { GroupService } from '@services/group.service';

@Injectable()
export class GroupProfileService {
    group: Group | null = null;

    constructor(private _groupService: GroupService) { }

    deleteGroup(groupId: string): Observable<void> {
        return this._groupService.deleteGroup(groupId);
    }

    loadGroup(groupId: string): void {
        const fields: string = 'avatarUrl,name,totalMembers,groupStatusName,currencyName,totalGlobalWallet,totalGlobalWalletPaid,totalActivePolicies,totalOpenSinisters,createdAt,createdByName,groupId';
        this._groupService.getGroup(groupId, fields).subscribe((res: HttpResponse) => {
            this.group = res.data;
        })
    }
}
