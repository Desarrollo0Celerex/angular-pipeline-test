import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { PolicyService } from '@services/policy.service';

import { ChartCancelledPoliciesComponent } from './chart-cancelled-policies.component';

@NgModule({
  declarations: [
    ChartCancelledPoliciesComponent
  ],
  exports: [
      ChartCancelledPoliciesComponent
  ],
  imports: [
    CommonModule,
    LoadingContentModule
  ],
  providers: [
      PolicyService
  ]
})
export class ChartCancelledPoliciesModule { }
