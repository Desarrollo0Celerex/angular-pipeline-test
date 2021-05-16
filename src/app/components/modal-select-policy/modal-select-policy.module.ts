import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalSelectPolicyComponent } from './modal-select-policy.component';

@NgModule({
  declarations: [ModalSelectPolicyComponent],
  exports: [ModalSelectPolicyComponent],
  imports: [
    CommonModule
  ]
})
export class ModalSelectPolicyModule { }
