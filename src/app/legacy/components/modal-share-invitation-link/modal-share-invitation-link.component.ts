import { Component, Input, OnInit } from '@angular/core';

import { ModalShareInvitationLinkService } from './modal-share-invitation-link.service';

@Component({
  selector: 'agt-modal-share-invitation-link',
  templateUrl: './modal-share-invitation-link.component.html',
  styles: [
  ]
})
export class ModalShareInvitationLinkComponent implements OnInit {
    @Input() modalId: string;
    @Input() invitationLink: string | null;

    constructor(public modalShareInvitationLinkService: ModalShareInvitationLinkService) {
        this.modalId = '';
        this.invitationLink = null;
    }

    ngOnInit(): void {
        this.modalShareInvitationLinkService.loadWorkspace();
    }

}
