import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalConfirmCreateInstagramAccountComponent } from './modal-confirm-create-instagram-account.component';

@NgModule({
  declarations: [
    ModalConfirmCreateInstagramAccountComponent
  ],
  exports: [
    ModalConfirmCreateInstagramAccountComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ModalConfirmCreateInstagramAccountModule { }
