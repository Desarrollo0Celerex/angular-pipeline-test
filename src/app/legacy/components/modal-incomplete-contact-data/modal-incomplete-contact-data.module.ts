import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalIncompleteContactDataComponent } from './modal-incomplete-contact-data.component';

@NgModule({
  declarations: [ModalIncompleteContactDataComponent],
  exports: [ModalIncompleteContactDataComponent],
  imports: [
    CommonModule
  ]
})
export class ModalIncompleteContactDataModule { }
