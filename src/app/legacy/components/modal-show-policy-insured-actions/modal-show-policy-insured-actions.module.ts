import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalShowPolicyInsuredActionsComponent } from './modal-show-policy-insured-actions.component';

@NgModule({
  declarations: [
    ModalShowPolicyInsuredActionsComponent
  ],
  exports: [
    ModalShowPolicyInsuredActionsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ModalShowPolicyInsuredActionsModule { }
