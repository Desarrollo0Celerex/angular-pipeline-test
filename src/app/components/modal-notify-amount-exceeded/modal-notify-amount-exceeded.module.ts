import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalNotifyAmountExceededComponent } from './modal-notify-amount-exceeded.component';

@NgModule({
  declarations: [
    ModalNotifyAmountExceededComponent
  ],
  exports: [
      ModalNotifyAmountExceededComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ModalNotifyAmountExceededModule { }
