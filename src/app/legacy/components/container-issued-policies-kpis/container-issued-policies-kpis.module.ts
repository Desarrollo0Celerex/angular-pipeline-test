import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardKpiOneModule } from '@components/card-kpi-one/card-kpi-one.module';
import { PolicyService } from '@services/policy.service';

import { ContainerIssuedPoliciesKpisComponent } from './container-issued-policies-kpis.component';

@NgModule({
  declarations: [
    ContainerIssuedPoliciesKpisComponent
  ],
  exports: [
      ContainerIssuedPoliciesKpisComponent
  ],
  imports: [
    CardKpiOneModule,
    CommonModule
  ],
  providers: [
      PolicyService
  ]
})
export class ContainerIssuedPoliciesKpisModule { }
