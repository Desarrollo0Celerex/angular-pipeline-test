import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactFileService } from '@services/contact-file.service';

import { ModalConfirmDeleteContactFileComponent } from './modal-confirm-delete-contact-file.component';

@NgModule({
  declarations: [ModalConfirmDeleteContactFileComponent],
  exports: [ModalConfirmDeleteContactFileComponent],
  imports: [
    CommonModule
  ],
  providers: [ContactFileService]
})
export class ModalConfirmDeleteContactFileModule { }
