import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ModalSelectRoleModule } from '@components/modal-select-role/modal-select-role.module';
import { InvitationService } from '@services/invitation.service';
import { RoleService } from '@services/role.service';
import { WorkspaceService } from '@core/services/workspace/workspace.service';

import { SendInvitationsComponent } from './send-invitations.component';
import { SendInvitationsService } from './send-invitations.service';

@NgModule({
    declarations: [SendInvitationsComponent],
    exports: [SendInvitationsComponent],
    imports: [
        CommonModule,
        FormsModule,
        ModalSelectRoleModule,
        ReactiveFormsModule,
    ],
    providers: [
        SendInvitationsService,
        InvitationService,
        RoleService,
        WorkspaceService,
    ],
})
export class SendInvitationsModule {}
