import { Component, OnInit } from '@angular/core';

import { Role } from '@interfaces/role.interface';
import { SendInvitationsService } from './send-invitations.service';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-send-invitations',
  templateUrl: './send-invitations.page.html',
  styles: [
  ]
})
export class SendInvitationsPage implements OnInit {
    changeRoleModalId: string;
    selectedRoleId: number | null;
    selectedFormIndex: number | null;

    constructor(public sendInvitationsService: SendInvitationsService) {
        this.changeRoleModalId = 'agt-modal-change-role'
        this.selectedRoleId = null;
        this.selectedFormIndex = null;
    }

    ngOnInit(): void {
        this._loadRoles();
    }

    /**
     * Get the rol name
     * @param  formIndex Form index
     * @return           Role name
     */
    getRoleName(formIndex: number): string {
        const roleId: number =  this.sendInvitationsService.invitationForms[formIndex].form.controls.roleId.value;
        const position: number = this.sendInvitationsService.roles.findIndex( (element: Role) => element.roleId == roleId);
        return this.sendInvitationsService.roles[position].name;
    }

    /**
     * Click event to change the role
     * @param formIndex Form index
     */
    onClickChangeRole(formIndex: number): void {
        this.selectedFormIndex = formIndex;
        this.selectedRoleId =  this.sendInvitationsService.invitationForms[formIndex].form.controls.roleId.value;
        ModalPlugin.show(this.changeRoleModalId);
    }

    /**
     * Submit event to create an invitation
     * @param formIndex Form index
     */
    onSubmitCreateInvitation(formIndex: number): void {
        console.log('Crear invitación: ', formIndex);
    }

    /**
     * Load the roles
     */
    private _loadRoles(): void {
        this.sendInvitationsService.loadRoles().subscribe(() => {
            this.sendInvitationsService.buildInvitationForms();
        })
    }

}
