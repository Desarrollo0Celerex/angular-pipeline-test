import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AddGroupMemberDataSend } from '@interfaces/add-group-member-data-send.interface';
import { Group } from '@interfaces/group.interface';
import { HttpResponse } from '@interfaces/http-response.interface';
import { GroupService } from '@services/group.service';
import { GroupMemberService } from '@services/group-member.service';

@Injectable()
export class GroupProfileService {
    group: Group | null = null;

    constructor(
        private _groupService: GroupService,
        private _groupMemberService: GroupMemberService,
    ) { }

    loadGroup(groupId: string): void {
        const fields: string = '';
        this._groupService.getGroup(groupId, fields).subscribe((res: HttpResponse) => {
            this.group = res.data;
        })
    }

    addGroupMember(groupId: string, contactId: string): Observable<void> {
        const requestBody: AddGroupMemberDataSend = { contactId };
        return this._groupMemberService.addGroupMember(groupId, requestBody);
    }
}
