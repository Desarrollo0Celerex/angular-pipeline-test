import { Component } from '@angular/core';

import { Invitation } from '@interfaces/invitation.interface';

@Component({
  selector: 'agt-list-invitations',
  templateUrl: './list-invitations.page.html',
  styles: [
  ]
})
export class ListInvitationsPage {
    canAddInvitationForm: boolean;
    invitation: Invitation | null;

    constructor() {
        this.canAddInvitationForm = false;
        this.invitation = null;
    }

    /**
     * Event to add a new invitation form to invitation forms
     */
    onInvitationDeleted(): void {
        this.canAddInvitationForm = true;
        setTimeout(() => {
            this.canAddInvitationForm = false;
        }, 0);
    }

    /**
     * Event to add a new invitation to invitations sent
     * @param invitation The new invitation
     */
    onInvitationSent(invitation: Invitation): void {
        this.invitation = invitation;
    }
}
