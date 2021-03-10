import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalSelectFileComponent } from './modal-select-file.component';

@NgModule({
  declarations: [ModalSelectFileComponent],
  exports: [ModalSelectFileComponent],
  imports: [
    CommonModule
  ]
})
export class ModalSelectFileModule { }
