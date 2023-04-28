import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { INVITATION_STATUS } from '@constants/global';
import { HttpResponse } from '@interfaces/http-response.interface';
import { Invitation } from '@interfaces/invitation.interface';
import { Role } from '@interfaces/role.interface';
import { InvitationService } from '@services/invitation.service';
import { RoleService } from '@services/role.service';

@Injectable()
export class SentInvitationsService {
    invitationsSent: Invitation[];
    roles: Role[];

    constructor(
        private _invitationService: InvitationService,
        private _roleService: RoleService
    ) {
        this.invitationsSent = [];
        this.roles = [];
    }

    /**
     * Add a new invitation to invitations sent
     * @param invitation Invitation
     */
    addInvitationSent(invitation: Invitation): void {
        this.invitationsSent.push(invitation);
    }

    /**
     * Delete an invitation
     * @param  invitationId The invitation ID
     * @return              Notice of action done
     */
    deleteInvitation(invitationId: number): Observable<void> {
        return this._invitationService.deleteInvitation(invitationId);
    }

    /**
     * Delete an invitation of invitations sent
     * @param invitationIndex The invitation index to delete
     */
    deleteInvitationSent(invitationIndex: number): void {
        this.invitationsSent.splice(invitationIndex, 1);
    }

    /**
     * Load the invitations sents
     * @return Notice of action done
     */
    loadInvitationsSent(): Observable<void> {
        const fields: string = 'invitationId,name,email,roleId,invitationToken';
        return this._invitationService.getInvitations(fields, INVITATION_STATUS.PENDING).pipe(
            tap( (res: HttpResponse) => {
                this.invitationsSent = res.data.items;
            }),
            map(() => { return; })
        );
    }

    /**
     * Load de roles
     */
    loadRoles(): void {
        const fields: string = 'roleId,name';
        this._roleService.getRoles(fields).subscribe( (res: HttpResponse) => {
            this.roles = res.data;
        });
    }

    /**
     * Send an invitation
     * @param  invitationId Invitation id
     * @return              Notice of action done
     */
    resendInvitation(invitationId: number): Observable<void> {
        return this._invitationService.sendInvitation(invitationId);
    }
}
