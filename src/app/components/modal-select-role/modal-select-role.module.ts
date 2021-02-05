import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RoleService } from '@services/role.service';

import { ModalSelectRoleComponent } from './modal-select-role.component';
import { ModalSelectRoleService } from './modal-select-role.service';

@NgModule({
  declarations: [ModalSelectRoleComponent],
  exports: [ModalSelectRoleComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ModalSelectRoleService, RoleService]
})
export class ModalSelectRoleModule { }
