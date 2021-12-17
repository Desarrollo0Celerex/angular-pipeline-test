import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContainerSelectStatsPeriodModule } from '@components/container-select-stats-period/container-select-stats-period.module';
import { ContentKpisModule } from '@components/content-kpis/content-kpis.module';
import { ContentListModule } from '@components/content-list/content-list.module';

import { ListActivePoliciesByRangeRoutingModule } from './list-active-policies-by-range-routing.module';
import { ListActivePoliciesByRangePage } from './list-active-policies-by-range.page';

@NgModule({
  declarations: [
    ListActivePoliciesByRangePage
  ],
  imports: [
    CommonModule,
    ContainerSelectStatsPeriodModule,
    ContentKpisModule,
    ContentListModule,
    ListActivePoliciesByRangeRoutingModule
  ]
})
export class ListActivePoliciesByRangeModule { }
