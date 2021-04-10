import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalScanningPolicyComponent } from './modal-scanning-policy.component';

@NgModule({
  declarations: [ModalScanningPolicyComponent],
  exports: [ModalScanningPolicyComponent],
  imports: [
    CommonModule
  ]
})
export class ModalScanningPolicyModule { }
