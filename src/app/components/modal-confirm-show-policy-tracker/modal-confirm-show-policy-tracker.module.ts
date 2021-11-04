import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalConfirmShowPolicyTrackerComponent } from './modal-confirm-show-policy-tracker.component';

@NgModule({
  declarations: [
    ModalConfirmShowPolicyTrackerComponent
  ],
  exports: [
      ModalConfirmShowPolicyTrackerComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ModalConfirmShowPolicyTrackerModule { }
