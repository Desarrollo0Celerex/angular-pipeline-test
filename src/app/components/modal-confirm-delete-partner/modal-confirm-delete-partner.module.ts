import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalConfirmDeletePartnerComponent } from './modal-confirm-delete-partner.component';

@NgModule({
  declarations: [
    ModalConfirmDeletePartnerComponent
  ],
  exports: [
      ModalConfirmDeletePartnerComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ModalConfirmDeletePartnerModule { }
