import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartInsurersComponent } from './chart-insurers.component';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';

@NgModule({
  declarations: [
    ChartInsurersComponent
  ],
  exports: [
      ChartInsurersComponent
  ],
  imports: [
    CommonModule,
    LoadingContentModule
  ]
})
export class ChartInsurersModule { }
