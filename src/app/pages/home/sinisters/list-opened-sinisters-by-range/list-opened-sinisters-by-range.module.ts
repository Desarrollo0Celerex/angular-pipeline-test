import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardContentTitleModule } from '@components/card-content-title/card-content-title.module';
import { ContainerChartsOpenedSinistersModule } from '@components/container-charts-opened-sinisters/container-charts-opened-sinisters.module';
import { ContainerSelectStatsPeriodModule } from '@components/container-select-stats-period/container-select-stats-period.module';
import { ContentListModule } from '@components/content-list/content-list.module';

import { ListOpenedSinistersByRangeRoutingModule } from './list-opened-sinisters-by-range-routing.module';
import { ListOpenedSinistersByRangePage } from './list-opened-sinisters-by-range.page';

@NgModule({
  declarations: [
    ListOpenedSinistersByRangePage
  ],
  imports: [
    CardContentTitleModule,
    CommonModule,
    ContainerChartsOpenedSinistersModule,
    ContainerSelectStatsPeriodModule,
    ContentListModule,
    ListOpenedSinistersByRangeRoutingModule
  ]
})
export class ListOpenedSinistersByRangeModule { }
