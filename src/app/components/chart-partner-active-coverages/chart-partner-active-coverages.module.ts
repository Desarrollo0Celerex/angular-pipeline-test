import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { PolicyService } from '@services/policy.service';

import { ChartPartnerActiveCoveragesComponent } from './chart-partner-active-coverages.component';

@NgModule({
  declarations: [
    ChartPartnerActiveCoveragesComponent
  ],
  exports: [
      ChartPartnerActiveCoveragesComponent
  ],
  imports: [
    CommonModule,
    LoadingContentModule
  ],
  providers: [
      PolicyService
  ]
})
export class ChartPartnerActiveCoveragesModule { }
