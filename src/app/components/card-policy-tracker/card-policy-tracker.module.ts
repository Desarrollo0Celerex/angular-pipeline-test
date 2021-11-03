import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardPolicyTrackerComponent } from './card-policy-tracker.component';

@NgModule({
  declarations: [
    CardPolicyTrackerComponent
  ],
  exports: [
      CardPolicyTrackerComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CardPolicyTrackerModule { }
