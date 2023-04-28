import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalConfirmSelectGroupComponent } from './modal-confirm-select-group.component';

@NgModule({
  declarations: [
    ModalConfirmSelectGroupComponent
  ],
  exports: [
      ModalConfirmSelectGroupComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ModalConfirmSelectGroupModule { }
