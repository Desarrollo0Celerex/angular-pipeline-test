import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalNotifyPolicyAlreadyExistsComponent } from './modal-notify-policy-already-exists.component';

@NgModule({
  declarations: [
    ModalNotifyPolicyAlreadyExistsComponent
  ],
  exports: [
      ModalNotifyPolicyAlreadyExistsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ModalNotifyPolicyAlreadyExistsModule { }
