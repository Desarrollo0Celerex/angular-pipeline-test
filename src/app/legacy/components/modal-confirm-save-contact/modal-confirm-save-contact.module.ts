import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalConfirmSaveContactComponent } from './modal-confirm-save-contact.component';

@NgModule({
  declarations: [ModalConfirmSaveContactComponent],
  exports: [ModalConfirmSaveContactComponent],
  imports: [
    CommonModule
  ]
})
export class ModalConfirmSaveContactModule { }
