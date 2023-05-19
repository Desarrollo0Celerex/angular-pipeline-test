import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalSessionExpiredComponent } from './modal-session-expired.component';

@NgModule({
  declarations: [
    ModalSessionExpiredComponent
  ],
  exports: [
    ModalSessionExpiredComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ModalSessionExpiredModule { }
