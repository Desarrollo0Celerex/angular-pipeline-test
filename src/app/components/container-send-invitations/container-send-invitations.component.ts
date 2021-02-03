import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { AlertHelper } from '@helpers/alert.helper';
import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { HttpResponse } from '@interfaces/http-response.interface';
import { Invitation } from '@interfaces/invitation.interface';
import { Role } from '@interfaces/role.interface';
import { LoadingService } from '@services/loading.service';

import { ContainerSendInvitationsService } from './container-send-invitations.service';

declare var ModalPlugin: any;
declare var TooltipPlugin: any;

@Component({
  selector: 'agt-container-send-invitations',
  templateUrl: './container-send-invitations.component.html',
  styles: [
  ]
})
export class ContainerSendInvitationsComponent implements OnInit, OnChanges {
    @Input() canAddInvitationForm: boolean;
    @Output() invitationSent: EventEmitter<Invitation>;
    changeRoleModalId: string;
    selectedRoleId: number | null;
    selectedFormIndex: number;

    constructor(
        public containerSendInvitationsService: ContainerSendInvitationsService,
        private _loadingService: LoadingService
    ) {
        this.canAddInvitationForm = false;
        this.invitationSent = new EventEmitter<Invitation>();
        this.changeRoleModalId = 'agt-modal-change-role'
        this.selectedRoleId = null;
        this.selectedFormIndex = 0;
    }

    ngOnInit(): void {
        this.containerSendInvitationsService.loadWorkspace();
        this.containerSendInvitationsService.loadRoles();
        this._buildInvitationForms();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if(changes.canAddInvitationForm.currentValue) {
            this.containerSendInvitationsService.addInvitationForm();
        }
    }

    /**
     * Get the error message
     * @param  constrolName Control name
     * @return              Error message
     */
    getErrorMessage(constrolName: string, formIndex: number): string {
        const control: AbstractControl | null = this.containerSendInvitationsService.invitationForms[formIndex].form.get(constrolName);
        return InputValidatorHelper.getErrorMessage(control);
    }

    /**
     * Get the rol name
     * @param  roleId Role id
     * @return        Role name
     */
    getRoleName(roleId: number): string {
        const selectedRole: Role | undefined = this.containerSendInvitationsService.roles.find( (element: Role) => element.roleId == roleId);
        return (!!selectedRole) ? selectedRole.name : '';
    }

    /**
     * Get the validation class
     * @param  constrolName Control name
     * @return              Validation class
     */
    getValidationClass(constrolName: string, formIndex: number): string {
        const control: AbstractControl | null = this.containerSendInvitationsService.invitationForms[formIndex].form.get(constrolName);
        return InputValidatorHelper.getValidationClass(control, this.containerSendInvitationsService.invitationForms[formIndex].isSubmitted);
    }

    /**
     * Click event to change the role
     * @param formIndex Form index
     */
    onClickChangeRole(formIndex: number): void {
        this.selectedFormIndex = formIndex;
        this.selectedRoleId =  this.containerSendInvitationsService.invitationForms[formIndex].form.controls.roleId.value;
        ModalPlugin.show(this.changeRoleModalId);
    }

    /**
     * Role changed event to change de role id
     * @param roleId Role id
     */
    onRoleChanged(roleId: number): void {
        this.containerSendInvitationsService.invitationForms[this.selectedFormIndex].form.patchValue({roleId});
    }

    /**
     * Submit event to create an invitation
     * @param formIndex Form index
     */
    onSubmitCreateInvitation(formIndex: number): void {
        this.containerSendInvitationsService.invitationForms[formIndex].isSubmitted = true;
        if(this.containerSendInvitationsService.invitationForms[formIndex].form.valid) {
            this._createInvitation(formIndex);
        }
    }

    /**
     * Build the invitation forms
     */
    private _buildInvitationForms(): void {
        this.containerSendInvitationsService.buildInvitationForms().subscribe( () => {
            TooltipPlugin.init();
        });
    }

    /**
     * Create an invitation
     * @param formIndex Form index
     */
    private _createInvitation(formIndex: number): void {
        this._loadingService.show();
        this.containerSendInvitationsService.createInvitation(formIndex).subscribe( (res: HttpResponse) => {
            const invitation: Invitation = res.data;
            this.containerSendInvitationsService.removeInvitationForm(formIndex);
            this._sendInvitation(invitation);
        })
    }

    /**
     * Send an invitation
     * @param invitation Invitation
     */
    private _sendInvitation(invitation: Invitation): void {
        this.containerSendInvitationsService.sendInvitation(invitation.invitationId).subscribe( () => {
            this._loadingService.hide();
            this.invitationSent.emit(invitation);
            AlertHelper.invitationSent();
        });
    }

}
