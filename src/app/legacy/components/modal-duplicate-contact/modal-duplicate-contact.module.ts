import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalDuplicateContactComponent } from './modal-duplicate-contact.component';

@NgModule({
  declarations: [ModalDuplicateContactComponent],
  exports: [ModalDuplicateContactComponent],
  imports: [
    CommonModule
  ]
})
export class ModalDuplicateContactModule { }
