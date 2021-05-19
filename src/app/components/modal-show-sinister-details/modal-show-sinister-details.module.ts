import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalShowSinisterDetailsComponent } from './modal-show-sinister-details.component';

@NgModule({
  declarations: [ModalShowSinisterDetailsComponent],
  exports: [ModalShowSinisterDetailsComponent],
  imports: [
    CommonModule
  ]
})
export class ModalShowSinisterDetailsModule { }
