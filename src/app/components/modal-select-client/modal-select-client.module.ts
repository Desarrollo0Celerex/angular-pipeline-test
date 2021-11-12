import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalSelectClientComponent } from './modal-select-client.component';

@NgModule({
  declarations: [
    ModalSelectClientComponent
  ],
  exports: [
      ModalSelectClientComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ModalSelectClientModule { }
