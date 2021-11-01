import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalConfirmShowPolicyEndorsementsComponent } from './modal-confirm-show-policy-endorsements.component';

@NgModule({
  declarations: [
    ModalConfirmShowPolicyEndorsementsComponent
  ],
  exports: [
      ModalConfirmShowPolicyEndorsementsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ModalConfirmShowPolicyEndorsementsModule { }
