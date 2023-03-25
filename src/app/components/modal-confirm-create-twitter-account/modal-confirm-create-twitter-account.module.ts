import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalConfirmCreateTwitterAccountComponent } from './modal-confirm-create-twitter-account.component';

@NgModule({
  declarations: [
    ModalConfirmCreateTwitterAccountComponent
  ],
  exports: [
    ModalConfirmCreateTwitterAccountComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ModalConfirmCreateTwitterAccountModule { }
