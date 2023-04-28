import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { PolicyService } from '@services/policy.service';

import { ChartGroupPreferredInsurersComponent } from './chart-group-preferred-insurers.component';

@NgModule({
  declarations: [
    ChartGroupPreferredInsurersComponent
  ],
  exports: [
      ChartGroupPreferredInsurersComponent
  ],
  imports: [
    CommonModule,
    LoadingContentModule
  ],
  providers: [
      PolicyService
  ]
})
export class ChartGroupPreferredInsurersModule { }
