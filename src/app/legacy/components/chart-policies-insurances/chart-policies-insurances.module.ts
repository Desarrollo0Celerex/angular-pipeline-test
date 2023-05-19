import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { PolicyService } from '@services/policy.service';

import { ChartPoliciesInsurancesComponent } from './chart-policies-insurances.component';

@NgModule({
  declarations: [
    ChartPoliciesInsurancesComponent
  ],
  exports: [
      ChartPoliciesInsurancesComponent
  ],
  imports: [
    CommonModule,
    LoadingContentModule
  ],
  providers: [
      PolicyService
  ]
})
export class ChartPoliciesInsurancesModule { }
