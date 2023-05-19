import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CreateGroupDataSend } from '@interfaces/create-group-data-send.interface';
import { GroupService } from '@services/group.service';

@Injectable()
export class ModalConfirmCreateGroupService {

    constructor(private _groupService: GroupService) { }

    createGroup(name: string, ignoreMatches: boolean): Observable<void> {
        const requestBody: CreateGroupDataSend = {
            name,
            ignoreMatches
        };
        return this._groupService.createGroup(requestBody);
    }
}
