import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { PolicyService } from '@services/policy.service';

import { CardPartnerPreferredInsurersComponent } from './card-partner-preferred-insurers.component';

@NgModule({
  declarations: [
    CardPartnerPreferredInsurersComponent
  ],
  exports: [
      CardPartnerPreferredInsurersComponent
  ],
  imports: [
    CommonModule,
    LoadingContentModule
  ],
  providers: [
      PolicyService
  ]
})
export class CardPartnerPreferredInsurersModule { }
