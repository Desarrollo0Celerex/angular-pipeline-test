import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { PolicyService } from '@services/policy.service';

import { CardPreferredInsurersComponent } from './card-preferred-insurers.component';

@NgModule({
  declarations: [CardPreferredInsurersComponent],
  exports: [CardPreferredInsurersComponent],
  imports: [
    CommonModule,
    LoadingContentModule
  ],
  providers: [PolicyService]
})
export class CardPreferredInsurersModule { }
