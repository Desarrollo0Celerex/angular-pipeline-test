import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonDownloadReportInsuranceSinistersModule } from '@components/button-download-report-insurance-sinisters/button-download-report-insurance-sinisters.module';
import { CardContentTitleModule } from '@components/card-content-title/card-content-title.module';
import { ContainerFiltersInsuranceSinistersModule } from '@components/container-filters-insurance-sinisters/container-filters-insurance-sinisters.module';
import { ContainerSelectStatsPeriodModule } from '@components/container-select-stats-period/container-select-stats-period.module';
import { ContentListModule } from '@components/content-list/content-list.module';

import { InsuranceSinistersByRangeRoutingModule } from './insurance-sinisters-by-range-routing.module';
import { InsuranceSinistersByRangePage } from './insurance-sinisters-by-range.page';


@NgModule({
  declarations: [
    InsuranceSinistersByRangePage
  ],
  imports: [
    ButtonDownloadReportInsuranceSinistersModule,
    CardContentTitleModule,
    CommonModule,
    ContainerFiltersInsuranceSinistersModule,
    ContainerSelectStatsPeriodModule,
    ContentListModule,
    InsuranceSinistersByRangeRoutingModule
  ]
})
export class InsuranceSinistersByRangeModule { }
