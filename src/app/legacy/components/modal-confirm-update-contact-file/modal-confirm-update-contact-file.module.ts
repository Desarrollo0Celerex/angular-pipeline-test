import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalConfirmUpdateContactFileComponent } from './modal-confirm-update-contact-file.component';

@NgModule({
  declarations: [ModalConfirmUpdateContactFileComponent],
  exports: [ModalConfirmUpdateContactFileComponent],
  imports: [
    CommonModule
  ]
})
export class ModalConfirmUpdateContactFileModule { }
