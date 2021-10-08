import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalNotifyMissingAmountComponent } from './modal-notify-missing-amount.component';

@NgModule({
  declarations: [
    ModalNotifyMissingAmountComponent
  ],
  exports: [
      ModalNotifyMissingAmountComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ModalNotifyMissingAmountModule { }
