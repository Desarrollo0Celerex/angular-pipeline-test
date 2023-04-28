import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalConfirmCreateFacebookAccountComponent } from './modal-confirm-create-facebook-account.component';

@NgModule({
  declarations: [
    ModalConfirmCreateFacebookAccountComponent
  ],
  exports: [
    ModalConfirmCreateFacebookAccountComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ModalConfirmCreateFacebookAccountModule { }
