import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalConfirmCreateWalletComponent } from './modal-confirm-create-wallet.component';

@NgModule({
  declarations: [
    ModalConfirmCreateWalletComponent
  ],
  exports: [
      ModalConfirmCreateWalletComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ModalConfirmCreateWalletModule { }
