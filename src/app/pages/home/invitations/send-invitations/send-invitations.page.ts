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
    selectedFormIndex: number;

    constructor(public sendInvitationsService: SendInvitationsService) {
        this.changeRoleModalId = 'agt-modal-change-role'
        this.selectedRoleId = null;
        this.selectedFormIndex = 0;
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
        const selectedRole: Role | undefined = this.sendInvitationsService.roles.find( (element: Role) => element.roleId == roleId);
        return (!!selectedRole) ? selectedRole.name : '';
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
     * Role changed event to change de role id
     * @param roleId Role id
     */
    onRoleChanged(roleId: number): void {
        this.sendInvitationsService.invitationForms[this.selectedFormIndex].form.patchValue({roleId});
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
