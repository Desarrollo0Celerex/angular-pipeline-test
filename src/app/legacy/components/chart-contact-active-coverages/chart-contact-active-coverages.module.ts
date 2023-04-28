import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { PolicyService } from '@services/policy.service';

import { ChartContactActiveCoveragesComponent } from './chart-contact-active-coverages.component';

@NgModule({
  declarations: [ChartContactActiveCoveragesComponent],
  exports: [ChartContactActiveCoveragesComponent],
  imports: [
    CommonModule,
    LoadingContentModule
  ],
  providers: [PolicyService]
})
export class ChartContactActiveCoveragesModule { }
