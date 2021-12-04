import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { PolicyService } from '@services/policy.service';

import { ChartPendingRenovationsComponent } from './chart-pending-renovations.component';

@NgModule({
  declarations: [
    ChartPendingRenovationsComponent
  ],
  exports: [
      ChartPendingRenovationsComponent
  ],
  imports: [
    CommonModule,
    LoadingContentModule
  ],
  providers: [
      PolicyService
  ]
})
export class ChartPendingRenovationsModule { }
