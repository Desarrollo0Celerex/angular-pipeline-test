import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { INVITATION_STATUS } from '@constants/global';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { InvitationByToken } from '@interfaces/invitation-by-token.interface';
import { UserTokenData } from '@core/interfaces/user-token-data.interface';
import { AuthService } from '@features/auth/services/auth.service';
import { FirebaseService } from '@core/services/firebase/firebase.service';
import { InvitationService } from '@services/invitation.service';

@Injectable()
export class AcceptInvitationService {
    invitation: InvitationByToken | null;

    constructor(
        private _authService: AuthService,
        private _firebaseService: FirebaseService,
        private _invitationService: InvitationService
    ) {
        this.invitation = null;
    }

    /**
     * Accept an invitation by token
     * @param  invitationToken The invitation token
     * @return                 The user token
     */
    acceptInvitation(invitationToken: string): Observable<HttpResponse> {
        return this._invitationService.acceptInvitation(invitationToken);
    }

    /**
     * Check if the invitation comes from an active workspace
     * @return True if it comes, otherwise false
     */
    checkComesActiveWorkspace(): boolean {
        return !!this.invitation && !!this.invitation.isActiveWorkspace
            ? true
            : false;
    }

    /**
     * Check if the user has an active workspace
     * @return True if you have it, otherwise false
     */
    checkHasActiveWorkspace(): boolean {
        return this._authService.checkHasActiveWorkspace();
    }

    /**
     * Check if the invitation is accepted
     * @return True if it is, otherwise false
     */
    checkIsInvitationAccepted(): boolean {
        return !!this.invitation &&
            this.invitation.invitationStatusId === INVITATION_STATUS.ACCEPTED
            ? true
            : false;
    }

    /**
     * Get the firebase token
     * @param  workspaceId Workspace id
     * @param  userId      User id
     * @return             Firebase token
     */
    getFirebaseToken(workspaceId: string, userId: string): Observable<string> {
        return this._authService.getFirebaseToken(workspaceId, userId);
    }

    /**
     * Get an invitation by token
     * @param  invitationToken The invitation token
     * @return                 Notice of action done
     */
    loadInvitation(invitationToken: string): Observable<void> {
        const fields: string =
            'invitationId,invitationStatusId,roleId,workspaceId,workspaceBrandName,workspaceAvatarUrl,isActiveWorkspace';
        return this._invitationService
            .getInvitationByToken(invitationToken, fields)
            .pipe(
                tap((res: HttpResponse) => {
                    this.invitation = res.data;
                }),
                map(() => {
                    return;
                })
            );
    }

    /**
     * Logout
     */
    logout(): void {
        this._authService.logout();
    }

    /**
     * Reject an invitation by token
     * @param  invitationToken The invitation token
     * @return                 Notice of action done
     */
    rejectInvitation(invitationToken: string): Observable<void> {
        return this._invitationService.rejectInvitation(invitationToken).pipe(
            tap(() => {
                if (!!this.invitation) {
                    this.invitation.invitationStatusId =
                        INVITATION_STATUS.REJECTED;
                }
            })
        );
    }

    /**
     * Login to Agenthos
     * @param  userToken The user token
     * @return           The user token data
     */
    startSessionInAgenthos(userToken: string): UserTokenData {
        return this._authService.startSessionInAgenthos(userToken);
    }

    /**
     * Login to Firebase
     * @param firebaseToken The firebase token
     */
    startSessionInFirebase(firebaseToken: string): Promise<any> {
        return this._firebaseService.startSessionInFirebase(firebaseToken);
    }
}
