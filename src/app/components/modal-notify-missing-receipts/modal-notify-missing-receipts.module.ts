import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalNotifyMissingReceiptsComponent } from './modal-notify-missing-receipts.component';

@NgModule({
  declarations: [
    ModalNotifyMissingReceiptsComponent
  ],
  exports: [
      ModalNotifyMissingReceiptsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ModalNotifyMissingReceiptsModule { }
