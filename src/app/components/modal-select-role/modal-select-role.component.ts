import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { Role } from '@interfaces/role.interface';

import { ModalSelectRoleService } from './modal-select-role.service';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-select-role',
  templateUrl: './modal-select-role.component.html',
  styles: [
  ]
})
export class ModalSelectRoleComponent implements OnInit, OnChanges {
    @Input() modalId: string;
    @Input() roleId: number | null;
    @Output() roleChanged: EventEmitter<number>;

    constructor(public ModalSelectRoleService: ModalSelectRoleService) {
        this.modalId = '';
        this.roleId = null;
        this.roleChanged = new EventEmitter<number>();
    }

    ngOnInit(): void {
        this.ModalSelectRoleService.loadRoles();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if(!!changes.roleId.currentValue) {
            this.ModalSelectRoleService.roleForm.patchValue({roleId: changes.roleId.currentValue});
        }
    }

    /**
     * Get the role description
     * @return Role description
     */
    getRoleDescription(): string {
        const roleId: number = this.ModalSelectRoleService.f.roleId.value;
        const selectedRole: Role | undefined = this.ModalSelectRoleService.roles.find( (element: Role) => element.roleId == roleId);
        return (!!selectedRole) ? selectedRole.description : '';
    }

    /**
     * Get the role deatils
     * @return Role deatils
     */
    getRoleDetails(): string {
        const roleId: number = this.ModalSelectRoleService.f.roleId.value;
        const selectedRole: Role | undefined = this.ModalSelectRoleService.roles.find( (element: Role) => element.roleId == roleId);
        return (!!selectedRole) ? selectedRole.details : '';
    }

    /**
     * Submit event to change role
     */
    onSubmitChangeRole(): void {
        if(this.ModalSelectRoleService.roleForm.valid) {
            const roleId: number = this.ModalSelectRoleService.f.roleId.value;
            this.roleChanged.emit(roleId);
            ModalPlugin.hide(this.modalId);
        }
    }

}
