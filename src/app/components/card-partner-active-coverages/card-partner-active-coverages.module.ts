import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { PolicyService } from '@services/policy.service';

import { CardPartnerActiveCoveragesComponent } from './card-partner-active-coverages.component';

@NgModule({
  declarations: [
    CardPartnerActiveCoveragesComponent
  ],
  exports: [
      CardPartnerActiveCoveragesComponent
  ],
  imports: [
    CommonModule,
    LoadingContentModule
  ],
  providers: [
      PolicyService
  ]
})
export class CardPartnerActiveCoveragesModule { }
