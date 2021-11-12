import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalDuplicateGroupComponent } from './modal-duplicate-group.component';

@NgModule({
  declarations: [
    ModalDuplicateGroupComponent
  ],
  exports: [
      ModalDuplicateGroupComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ModalDuplicateGroupModule { }
