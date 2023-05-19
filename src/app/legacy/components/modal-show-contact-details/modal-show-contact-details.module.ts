import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalShowContactDetailsComponent } from './modal-show-contact-details.component';

@NgModule({
  declarations: [
    ModalShowContactDetailsComponent
  ],
  exports: [
      ModalShowContactDetailsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ModalShowContactDetailsModule { }
