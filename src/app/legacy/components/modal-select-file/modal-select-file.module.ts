import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ModalSelectFileComponent } from './modal-select-file.component';

@NgModule({
  declarations: [ModalSelectFileComponent],
  exports: [ModalSelectFileComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ModalSelectFileModule { }
