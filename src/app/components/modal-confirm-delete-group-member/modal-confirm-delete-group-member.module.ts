import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalConfirmDeleteGroupMemberComponent } from './modal-confirm-delete-group-member.component';

@NgModule({
  declarations: [
    ModalConfirmDeleteGroupMemberComponent
  ],
  exports: [
      ModalConfirmDeleteGroupMemberComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ModalConfirmDeleteGroupMemberModule { }
