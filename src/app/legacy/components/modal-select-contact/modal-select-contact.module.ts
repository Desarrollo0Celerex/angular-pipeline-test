import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalSelectContactComponent } from './modal-select-contact.component';

@NgModule({
  declarations: [ModalSelectContactComponent],
  exports: [ModalSelectContactComponent],
  imports: [
    CommonModule
  ]
})
export class ModalSelectContactModule { }
