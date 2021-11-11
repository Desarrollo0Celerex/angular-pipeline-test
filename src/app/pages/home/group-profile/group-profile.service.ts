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
    groupMembers: string[] = [];
    isLoadedGroupMembers: boolean = false;

    constructor(
        private _groupService: GroupService,
        private _groupMemberService: GroupMemberService,
    ) { }

    addGroupMember(groupId: string, contactId: string): Observable<void> {
        const requestBody: AddGroupMemberDataSend = { contactId };
        return this._groupMemberService.addGroupMember(groupId, requestBody);
    }

    loadGroup(groupId: string): void {
        const fields: string = 'avatarUrl,name,totalMembers,createdAt';
        this._groupService.getGroup(groupId, fields).subscribe((res: HttpResponse) => {
            this.group = res.data;
        })
    }

    loadGroupMembers(groupId: string): void {
        const fields: string = 'contactId';
        const page: number = 1;
        const perPage: number = 100;
        this._groupMemberService.getGroupMembers(groupId, fields, page, perPage).subscribe((res: HttpResponse) => {
            for (let member of res.data.items) {
                this.groupMembers.push(member.contactId);
            }
            this.isLoadedGroupMembers = true;
        })
    }
}
