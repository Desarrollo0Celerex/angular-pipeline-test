import { Component } from '@angular/core';

import { CONTENT_TYPES } from '@constants/global';

@Component({
    selector: 'agt-members',
    templateUrl: './members.page.html',
    styles: [],
    standalone: false
})
export class MembersPage {
    contentType: number = CONTENT_TYPES.GROUP_MEMBER.ID;
    contentTypeName: string = CONTENT_TYPES.GROUP_MEMBER.NAME;

}
