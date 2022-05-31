import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { PolicyService } from '@services/policy.service';

import { ChartGroupActiveCoveragesComponent } from './chart-group-active-coverages.component';

@NgModule({
  declarations: [
    ChartGroupActiveCoveragesComponent
  ],
  exports: [
      ChartGroupActiveCoveragesComponent
  ],
  imports: [
    CommonModule,
    LoadingContentModule
  ],
  providers: [
      PolicyService
  ]
})
export class ChartGroupActiveCoveragesModule { }
