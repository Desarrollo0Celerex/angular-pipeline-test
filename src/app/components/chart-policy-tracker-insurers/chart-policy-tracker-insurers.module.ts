import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { PolicyService } from '@services/policy.service';

import { ChartPolicyTrackerInsurersComponent } from './chart-policy-tracker-insurers.component';

@NgModule({
  declarations: [
    ChartPolicyTrackerInsurersComponent
  ],
  exports: [
      ChartPolicyTrackerInsurersComponent
  ],
  imports: [
    CommonModule,
    LoadingContentModule
  ],
  providers: [
      PolicyService
  ]
})
export class ChartPolicyTrackerInsurersModule { }
