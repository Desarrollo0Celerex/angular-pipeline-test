import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ROUTES_NAME } from '@constants/routes-name';
import { Client } from '@interfaces/client.interface';

@Component({
  selector: 'agt-card-group-member',
  templateUrl: './card-group-member.component.html',
  styles: [
  ]
})
export class CardGroupMemberComponent {
    @Input() client: Client | null = null;
    @Output() deleteGroupMemberRequested: EventEmitter<string> = new EventEmitter<string>();
    ROUTES_NAME: any = ROUTES_NAME;

    requestDeleteGroupMember(contactId: string): void {
        this.deleteGroupMemberRequested.emit(contactId);
    }
}
