import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalConfirmDeleteGroupComponent } from './modal-confirm-delete-group.component';

@NgModule({
  declarations: [
    ModalConfirmDeleteGroupComponent
  ],
  exports: [
      ModalConfirmDeleteGroupComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ModalConfirmDeleteGroupModule { }
