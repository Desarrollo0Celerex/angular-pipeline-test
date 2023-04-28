import { Injectable } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { HttpResponse } from '@interfaces/http-response.interface';
import { Role } from '@interfaces/role.interface';
import { RoleService } from '@services/role.service';

@Injectable()
export class ModalSelectRoleService {
    roles: Role[];
    roleForm: UntypedFormGroup;

    constructor(
        private _formBuilder: UntypedFormBuilder,
        private _roleService: RoleService
    ){
        this.roleForm = this._buildRoleForm();
        this.roles = [];
    }

    /**
     * Get the form controls
     * @return Form controls
     */
    get f(): { [key: string]: AbstractControl; }  {
        return this.roleForm.controls;
    }

    /**
     * Load the roles
     */
    loadRoles(): void {
        const fields: string = 'roleId,name,description,details';
        this._roleService.getRoles(fields).subscribe((res: HttpResponse) => {
            this.roles = res.data;
        })
    }

    /**
     * Build the role form
     * @return Role form
     */
    private _buildRoleForm(): UntypedFormGroup {
        return this._formBuilder.group({
            roleId: ['', [Validators.required]]
        });
    }

}
