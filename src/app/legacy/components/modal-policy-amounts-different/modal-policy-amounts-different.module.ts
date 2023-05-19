import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalPolicyAmountsDifferentComponent } from './modal-policy-amounts-different.component';

@NgModule({
  declarations: [
    ModalPolicyAmountsDifferentComponent
  ],
  exports: [
      ModalPolicyAmountsDifferentComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ModalPolicyAmountsDifferentModule { }
