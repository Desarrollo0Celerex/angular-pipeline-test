import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalShowGroupDetailsComponent } from './modal-show-group-details.component';

@NgModule({
  declarations: [
    ModalShowGroupDetailsComponent
  ],
  exports: [
      ModalShowGroupDetailsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ModalShowGroupDetailsModule { }
