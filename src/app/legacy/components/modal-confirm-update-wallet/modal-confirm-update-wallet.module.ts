import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalConfirmUpdateWalletComponent } from './modal-confirm-update-wallet.component';

@NgModule({
  declarations: [
    ModalConfirmUpdateWalletComponent
  ],
  exports: [
      ModalConfirmUpdateWalletComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ModalConfirmUpdateWalletModule { }
