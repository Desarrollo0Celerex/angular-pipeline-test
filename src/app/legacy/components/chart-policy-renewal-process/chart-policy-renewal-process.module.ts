import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { PolicyService } from '@services/policy.service';

import { ChartPolicyRenewalProcessComponent } from './chart-policy-renewal-process.component';

@NgModule({
  declarations: [
    ChartPolicyRenewalProcessComponent
  ],
  exports: [
      ChartPolicyRenewalProcessComponent
  ],
  imports: [
    CommonModule,
    LoadingContentModule
  ],
  providers: [
      PolicyService
  ]
})
export class ChartPolicyRenewalProcessModule { }
