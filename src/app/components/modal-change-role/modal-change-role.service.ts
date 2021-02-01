import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HttpResponse } from '@interfaces/http-response.interface';
import { Role } from '@interfaces/role.interface';
import { RoleService } from '@services/role.service';

@Injectable()
export class ModalChangeRoleService {
    roles: Role[];
    roleForm: FormGroup;

    constructor(
        private _formBuilder: FormBuilder,
        private _roleService: RoleService
    ){

        this.roleForm = this.getRoleForm();
        this.roles = [];
    }

    getRoleForm(): FormGroup {
        return this._formBuilder.group({
            roleId: ['', [Validators.required]]
        });
    }

    loadRoles(): void {
        this._roleService.getRoles().subscribe((res: HttpResponse) => {
            this.roles = res.data;
        })
    }

}
