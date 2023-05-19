import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContainerSelectStatsPeriodModule } from '@components/container-select-stats-period/container-select-stats-period.module';
import { ContentKpisModule } from '@components/content-kpis/content-kpis.module';
import { ContentListModule } from '@components/content-list/content-list.module';

import { ListQuotationsByRangeRoutingModule } from './list-quotations-by-range-routing.module';
import { ListQuotationsByRangePage } from './list-quotations-by-range.page';

@NgModule({
  declarations: [
    ListQuotationsByRangePage
  ],
  imports: [
    CommonModule,
    ContainerSelectStatsPeriodModule,
    ContentKpisModule,
    ContentListModule,
    ListQuotationsByRangeRoutingModule
  ]
})
export class ListQuotationsByRangeModule { }
