import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalSelectContactActionComponent } from './modal-select-contact-action.component';

@NgModule({
  declarations: [
    ModalSelectContactActionComponent
  ],
  exports: [
    ModalSelectContactActionComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ModalSelectContactActionModule { }
