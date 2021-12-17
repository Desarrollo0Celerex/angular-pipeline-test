import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardKpiActivePoliciesComponent } from './card-kpi-active-policies.component';

import { PolicyService } from '@services/policy.service';

@NgModule({
  declarations: [
    CardKpiActivePoliciesComponent
  ],
  exports: [
      CardKpiActivePoliciesComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
      PolicyService
  ]
})
export class CardKpiActivePoliciesModule { }
