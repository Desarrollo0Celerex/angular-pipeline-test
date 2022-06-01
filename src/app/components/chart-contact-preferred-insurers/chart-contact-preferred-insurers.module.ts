import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { PolicyService } from '@services/policy.service';

import { ChartContactPreferredInsurersComponent } from './chart-contact-preferred-insurers.component';

@NgModule({
  declarations: [ChartContactPreferredInsurersComponent],
  exports: [ChartContactPreferredInsurersComponent],
  imports: [
    CommonModule,
    LoadingContentModule
  ],
  providers: [PolicyService]
})
export class ChartContactPreferredInsurersModule { }
