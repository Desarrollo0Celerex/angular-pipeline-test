import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkspaceService } from '@core/services/workspace/workspace.service';

import { ModalShareInvitationLinkComponent } from './modal-share-invitation-link.component';
import { ModalShareInvitationLinkService } from './modal-share-invitation-link.service';

@NgModule({
    declarations: [ModalShareInvitationLinkComponent],
    exports: [ModalShareInvitationLinkComponent],
    imports: [CommonModule],
    providers: [ModalShareInvitationLinkService, WorkspaceService],
})
export class ModalShareInvitationLinkModule {}
