import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalNotifyReceiptsExceededComponent } from './modal-notify-receipts-exceeded.component';

@NgModule({
  declarations: [
    ModalNotifyReceiptsExceededComponent
  ],
  exports: [
      ModalNotifyReceiptsExceededComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ModalNotifyReceiptsExceededModule { }
