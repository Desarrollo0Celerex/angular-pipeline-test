import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalSelectContactTypeComponent } from './modal-select-contact-type.component';

@NgModule({
  declarations: [ModalSelectContactTypeComponent],
  exports: [ModalSelectContactTypeComponent],
  imports: [
    CommonModule
  ]
})
export class ModalSelectContactTypeModule { }
