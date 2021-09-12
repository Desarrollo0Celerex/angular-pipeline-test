import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalUserRoleUpdatedComponent } from './modal-user-role-updated.component';

@NgModule({
  declarations: [
    ModalUserRoleUpdatedComponent
  ],
  exports: [
      ModalUserRoleUpdatedComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ModalUserRoleUpdatedModule { }
