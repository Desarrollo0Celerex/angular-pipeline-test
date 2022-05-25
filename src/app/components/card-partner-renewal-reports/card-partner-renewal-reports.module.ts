import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { PolicyService } from '@services/policy.service';

import { CardPartnerRenewalReportsComponent } from './card-partner-renewal-reports.component';

@NgModule({
  declarations: [
    CardPartnerRenewalReportsComponent
  ],
  exports: [
      CardPartnerRenewalReportsComponent
  ],
  imports: [
    CommonModule,
    LoadingContentModule
  ],
  providers: [
      PolicyService
  ]
})
export class CardPartnerRenewalReportsModule { }
