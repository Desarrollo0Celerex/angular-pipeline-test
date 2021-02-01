import { Component, EventEmitter, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { ModalChangeRoleService } from './modal-change-role.service';

@Component({
  selector: 'agt-modal-change-role',
  templateUrl: './modal-change-role.component.html',
  styles: [
  ]
})
export class ModalChangeRoleComponent implements OnInit, OnChanges {
    @Input() modalId: string;
    @Input() roleId: number | null;

    constructor(public modalChangeRoleService: ModalChangeRoleService) {
        this.modalId = '';
        this.roleId = null;
    }

    ngOnInit(): void {
        this.modalChangeRoleService.loadRoles();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if(!!changes.roleId.currentValue) {
            console.log('changes.roleId.currentValue: ',changes.roleId.currentValue);
        }
    }

    onSubmitChangeRole(): void {
        if(this.modalChangeRoleService.roleForm.valid) {
            const roleId: number = this.modalChangeRoleService.roleForm.controls.roleId.value;
            console.log('cambiar rol...', roleId);
        }
    }

}
