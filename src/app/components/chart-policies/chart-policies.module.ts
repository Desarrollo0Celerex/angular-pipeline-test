import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { PolicyService } from '@services/policy.service';

import { ChartPoliciesComponent } from './chart-policies.component';

@NgModule({
  declarations: [
    ChartPoliciesComponent
  ],
  exports: [
      ChartPoliciesComponent
  ],
  imports: [
    CommonModule,
    LoadingContentModule
  ],
  providers: [
      PolicyService
  ]
})
export class ChartPoliciesModule { }
