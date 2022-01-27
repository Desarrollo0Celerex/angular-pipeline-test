import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';

import { ChartInsurancesComponent } from './chart-insurances.component';


@NgModule({
  declarations: [
    ChartInsurancesComponent
  ],
  exports: [ChartInsurancesComponent],
  imports: [
    CommonModule,
    LoadingContentModule
  ]
})
export class ChartInsurancesModule { }
