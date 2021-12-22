import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalConfirmDeleteContactComponent } from './modal-confirm-delete-contact.component';

@NgModule({
  declarations: [
    ModalConfirmDeleteContactComponent
  ],
  exports: [
      ModalConfirmDeleteContactComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ModalConfirmDeleteContactModule { }
