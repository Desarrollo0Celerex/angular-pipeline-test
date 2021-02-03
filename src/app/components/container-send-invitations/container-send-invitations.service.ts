import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { OWN_NAME_LENGTH, EMAIL_LENGTH, DEFAULT_ROLE_ID } from '@constants/global';
import { ValidatorsHelper } from '@helpers/validators.helper';
import { CreateInvitationDataSend } from '@interfaces/create-invitation-data-send.interface';
import { HttpResponse } from '@interfaces/http-response.interface';
import { InvitationForm } from '@interfaces/invitation-form.interface'
import { Role } from '@interfaces/role.interface';
import { Workspace } from '@interfaces/workspace.interface';
import { InvitationService } from '@services/invitation.service';
import { RoleService } from '@services/role.service';
import { WorkspaceService } from '@services/workspace.service';

@Injectable()
export class ContainerSendInvitationsService {
    invitationForms: InvitationForm[];
    roles: Role[];
    workspace: Workspace | null;

    constructor(
        private _formBuilder: FormBuilder,
        private _invitationService: InvitationService,
        private _roleService: RoleService,
        private _workspaceService: WorkspaceService
    ) {
        this.invitationForms = [];
        this.roles = [];
        this.workspace = null;
    }

    /**
     * Add a new invitation form to invitation forms
     */
    addInvitationForm(): void {
        const invitationForm: InvitationForm = {
            form: this._getInvitationForm(),
            isSubmitted: false
        }
        this.invitationForms.push(invitationForm);
    }

    /**
     * Build the invitation forms
     * @return Notice of action done
     */
    buildInvitationForms(): Observable<void> {
        this.invitationForms = [];
        return this._workspaceService.getWorkspaceAvailablePlaces().pipe(
            tap((res: HttpResponse) => {
                const availablePlaces: number = res.data;
                for(let i: number = 0; i<availablePlaces; i++) {
                    this.addInvitationForm();
                }
            }),
            map(() => { return; })
        )
    }

    /**
     * Create the invitation
     * @param  formIndex Form index
     * @return           Invitation
     */
    createInvitation(formIndex: number): Observable<HttpResponse> {
        const requestBody: CreateInvitationDataSend = this.invitationForms[formIndex].form.value;
        return this._invitationService.createInvitation(requestBody);
    }

    /**
     * Load the roles
     */
    loadRoles(): void {
        const fields: string = 'roleId,name';
        this._roleService.getRoles(fields).subscribe( (res: HttpResponse) => {
            this.roles = res.data;
        });
    }

    /**
     * Load the workspace
     */
    loadWorkspace(): void {
        const fields: string = 'brandName';
        this._workspaceService.getWorkspace(fields).subscribe( (res: HttpResponse) => {
            this.workspace = res.data;
        })
    }

    /**
     * Send an invitation
     * @param  invitationId Invitation id
     * @return              Notice of action done
     */
    sendInvitation(invitationId: number): Observable<void> {
        return this._invitationService.sendInvitation(invitationId);
    }

    /**
     * Remove an invitation form from invitation forms
     * @param formIndex Form index
     */
    removeInvitationForm(formIndex: number): void {
        this.invitationForms.splice(formIndex, 1);
    }

    /**
     * Get an invitation form
     * @return Invitation form
     */
    private _getInvitationForm(): FormGroup {
        return this._formBuilder.group({
            name: ['', [Validators.required, Validators.minLength(OWN_NAME_LENGTH.MIN), Validators.maxLength(OWN_NAME_LENGTH.MAX), ValidatorsHelper.ownName]],
            email: ['', [Validators.required, Validators.email, Validators.minLength(EMAIL_LENGTH.MIN), Validators.maxLength(EMAIL_LENGTH.MAX)]],
            roleId: [DEFAULT_ROLE_ID, [Validators.required]]
        })
    }
}
