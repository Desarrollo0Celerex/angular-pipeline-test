import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RoleService } from '@services/role.service';

import { ModalChangeRoleComponent } from './modal-change-role.component';
import { ModalChangeRoleService } from './modal-change-role.service';

@NgModule({
  declarations: [ModalChangeRoleComponent],
  exports: [ModalChangeRoleComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ModalChangeRoleService, RoleService]
})
export class ModalChangeRoleModule { }
