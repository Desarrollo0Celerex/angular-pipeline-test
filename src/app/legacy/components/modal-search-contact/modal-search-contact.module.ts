import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ModalSearchContactComponent } from './modal-search-contact.component';

@NgModule({
  declarations: [
    ModalSearchContactComponent
  ],
  exports: [
    ModalSearchContactComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ModalSearchContactModule { }
