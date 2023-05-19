import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';

import { CardKpiPercentageComponent } from './card-kpi-percentage.component';

@NgModule({
  declarations: [
    CardKpiPercentageComponent
  ],
  exports: [
    CardKpiPercentageComponent
  ],
  imports: [
    CommonModule,
    LoadingContentModule,
    RouterModule
  ]
})
export class CardKpiPercentageModule { }
