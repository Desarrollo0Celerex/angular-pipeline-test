import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardExternalPolicyComponent } from './card-external-policy.component';

@NgModule({
  declarations: [
    CardExternalPolicyComponent
  ],
  exports: [
      CardExternalPolicyComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CardExternalPolicyModule { }
