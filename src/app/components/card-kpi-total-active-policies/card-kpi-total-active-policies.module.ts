import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardKpiTotalActivePoliciesComponent } from './card-kpi-total-active-policies.component';

import { PolicyService } from '@services/policy.service';

@NgModule({
  declarations: [
    CardKpiTotalActivePoliciesComponent
  ],
  exports: [
      CardKpiTotalActivePoliciesComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
      PolicyService
  ]
})
export class CardKpiTotalActivePoliciesModule { }
