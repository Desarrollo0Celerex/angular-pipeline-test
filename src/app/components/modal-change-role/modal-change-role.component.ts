import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { Role } from '@interfaces/role.interface';

import { ModalChangeRoleService } from './modal-change-role.service';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-change-role',
  templateUrl: './modal-change-role.component.html',
  styles: [
  ]
})
export class ModalChangeRoleComponent implements OnInit, OnChanges {
    @Input() modalId: string;
    @Input() roleId: number | null;
    @Output() roleChanged: EventEmitter<number>;

    constructor(public modalChangeRoleService: ModalChangeRoleService) {
        this.modalId = '';
        this.roleId = null;
        this.roleChanged = new EventEmitter<number>();
    }

    ngOnInit(): void {
        this.modalChangeRoleService.loadRoles();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if(!!changes.roleId.currentValue) {
            this.modalChangeRoleService.roleForm.patchValue({roleId: changes.roleId.currentValue});
        }
    }

    /**
     * Get the role description
     * @return Role description
     */
    getRoleDescription(): string {
        const roleId: number = this.modalChangeRoleService.f.roleId.value;
        const selectedRole: Role | undefined = this.modalChangeRoleService.roles.find( (element: Role) => element.roleId == roleId);
        return (!!selectedRole) ? selectedRole.description : '';
    }

    /**
     * Get the role deatils
     * @return Role deatils
     */
    getRoleDetails(): string {
        const roleId: number = this.modalChangeRoleService.f.roleId.value;
        const selectedRole: Role | undefined = this.modalChangeRoleService.roles.find( (element: Role) => element.roleId == roleId);
        return (!!selectedRole) ? selectedRole.details : '';
    }

    /**
     * Submit event to change role
     */
    onSubmitChangeRole(): void {
        if(this.modalChangeRoleService.roleForm.valid) {
            const roleId: number = this.modalChangeRoleService.f.roleId.value;
            this.roleChanged.emit(roleId);
            ModalPlugin.hide(this.modalId);
        }
    }

}
