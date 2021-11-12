import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalConfirmAddMemberComponent } from './modal-confirm-add-member.component';

@NgModule({
  declarations: [
    ModalConfirmAddMemberComponent
  ],
  exports: [
      ModalConfirmAddMemberComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ModalConfirmAddMemberModule { }
