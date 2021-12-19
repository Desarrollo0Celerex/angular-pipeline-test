import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PolicyService } from '@services/policy.service';

import { CardKpiTotalLastCancelledPoliciesComponent } from './card-kpi-total-last-cancelled-policies.component';

@NgModule({
  declarations: [
    CardKpiTotalLastCancelledPoliciesComponent
  ],
  exports: [
      CardKpiTotalLastCancelledPoliciesComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
      PolicyService
  ]
})
export class CardKpiTotalLastCancelledPoliciesModule { }
