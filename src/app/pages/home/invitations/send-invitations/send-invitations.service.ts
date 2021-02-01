import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { OWN_NAME_LENGTH, EMAIL_LENGTH, DEFAULT_ROLE_ID, INVITATION_STATUS } from '@constants/global';
import { ValidatorsHelper } from '@helpers/validators.helper';
import { HttpResponse } from '@interfaces/http-response.interface';
import { Role } from '@interfaces/role.interface';
import { InvitationForm } from '@interfaces/invitation-form.interface'
import { RoleService } from '@services/role.service';
import { WorkspaceService } from '@services/workspace.service';

@Injectable()
export class SendInvitationsService {
    invitationForms: InvitationForm[];
    roles: Role[];

    constructor(
        private _formBuilder: FormBuilder,
        private _roleService: RoleService,
        private _workspaceService: WorkspaceService
    ) {
        this.invitationForms = [];
        this.roles = [];
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
     */
    buildInvitationForms(): void {
        this.invitationForms = [];
        this._workspaceService.getWorkspaceAvailablePlaces().subscribe( (res: HttpResponse) => {
            const availablePlaces: number = res.data;
            for(let i: number = 0; i<availablePlaces; i++) {
                this.addInvitationForm();
            }
        })
    }

    /**
     * Load de roles
     * @return Action done notification
     */
    loadRoles(): Observable<void> {
        return new Observable( (observer) => {
            this._roleService.getRoles().subscribe( (res: HttpResponse) => {
                this.roles = res.data;
                observer.next();
                observer.complete();
            });
        })
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
