import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalDuplicatePartnerComponent } from './modal-duplicate-partner.component';

@NgModule({
  declarations: [
    ModalDuplicatePartnerComponent
  ],
  exports: [
      ModalDuplicatePartnerComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ModalDuplicatePartnerModule { }
