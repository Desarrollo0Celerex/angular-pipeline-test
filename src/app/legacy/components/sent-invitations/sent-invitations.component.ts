import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';

import { environment } from '@env/environment';
import { AlertHelper } from '@core/helpers/alert.helper';
import { DeleteInvitationData } from '@interfaces/delete-invitation-data.interface';
import { Invitation } from '@interfaces/invitation.interface';
import { Role } from '@interfaces/role.interface';
import { LoadingService } from '@core/services/loading/loading.service';

import { SentInvitationsService } from './sent-invitations.service';

declare var ModalPlugin: any;
declare var PopoverPlugin: any;
declare var TooltipPlugin: any;

@Component({
    selector: 'agt-sent-invitations',
    templateUrl: './sent-invitations.component.html',
    styles: [],
})
export class SentInvitationsComponent implements OnInit, OnChanges {
    @Input() invitation: Invitation | null;
    @Output() invitationDeleted: EventEmitter<void>;
    invitationLink: string | null;
    shareInvitationLinkModalId: string;

    constructor(
        public containerListSentInvitationsService: SentInvitationsService,
        private _loadingService: LoadingService
    ) {
        this.invitation = null;
        this.invitationDeleted = new EventEmitter<void>();
        this.invitationLink = null;
        this.shareInvitationLinkModalId = 'agt-modal-share-invitation-link';
    }

    ngOnInit(): void {
        this.containerListSentInvitationsService.loadRoles();
        this._loadInvitationsSent();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (!!changes.invitation.currentValue) {
            this.containerListSentInvitationsService.addInvitationSent(
                changes.invitation.currentValue
            );
        }
    }

    /**
     * Get the rol name
     * @param  roleId Role id
     * @return        Role name
     */
    getRoleName(roleId: number): string {
        const selectedRole: Role | undefined =
            this.containerListSentInvitationsService.roles.find(
                (element: Role) => element.roleId == roleId
            );
        return !!selectedRole ? selectedRole.name : '';
    }

    /**
     * Event click to delete an invitation
     * @param invitationId      The invitation id
     * @param invitationIndex   The invitation index
     */
    onClickDeleteInvitation(
        invitationId: number,
        invitationIndex: number
    ): void {
        const deleteInvitationData: DeleteInvitationData = {
            invitationId,
            invitationIndex,
        };
        AlertHelper.requestDeleteInvitation(
            this._deleteInvitation,
            this,
            deleteInvitationData
        );
    }

    /**
     * Click event to resend invitation
     * @param invitationId Invitation id
     */
    onClickResendInvitation(invitationId: number): void {
        this._loadingService.show();
        this.containerListSentInvitationsService
            .resendInvitation(invitationId)
            .subscribe(() => {
                this._loadingService.hide();
                AlertHelper.invitationSent();
            });
    }

    /**
     * Click event to share an invitation
     * @param invitationId The invitation ID
     */
    onClickShareInvitation(invitationToken: string): void {
        this.invitationLink = `${environment.agenthos.appUrl}/invitations/check-accept-invitation/${invitationToken}`;
        ModalPlugin.show(this.shareInvitationLinkModalId);
    }

    /**
     * Delete the invitation
     * @param context              App context
     * @param deleteInvitationData Data of the invitation to delete
     */
    private _deleteInvitation(
        context: SentInvitationsComponent,
        deleteInvitationData: DeleteInvitationData
    ): void {
        context._loadingService.show();
        context.containerListSentInvitationsService
            .deleteInvitation(deleteInvitationData.invitationId)
            .subscribe(() => {
                context._loadingService.hide();
                context.containerListSentInvitationsService.deleteInvitationSent(
                    deleteInvitationData.invitationIndex
                );
                context.invitationDeleted.emit();
                AlertHelper.invitationDeleted();
            });
    }

    /**
     * Load the invitations sent
     */
    private _loadInvitationsSent(): void {
        this.containerListSentInvitationsService
            .loadInvitationsSent()
            .subscribe(() => {
                TooltipPlugin.init();
                PopoverPlugin.init();
            });
    }
}
