import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { PolicyService } from '@services/policy.service';

import { ChartRenewedPoliciesComponent } from './chart-renewed-policies.component';

@NgModule({
  declarations: [
    ChartRenewedPoliciesComponent
  ],
  imports: [
    CommonModule,
    LoadingContentModule
  ],
  exports: [
      ChartRenewedPoliciesComponent
  ],
  providers: [
      PolicyService
  ]
})
export class ChartRenewedPoliciesModule { }
