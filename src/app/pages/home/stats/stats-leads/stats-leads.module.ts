import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContainerSelectStatsPeriodModule } from '@components/container-select-stats-period/container-select-stats-period.module';
import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { MenuStatsModule } from '@components/menu-stats/menu-stats.module';
import { ContactSourceService } from '@services/contact-source.service';
import { LeadService } from '@services/lead.service';
import { QuotationService } from '@services/quotation.service';

import { StatsLeadsRoutingModule } from './stats-leads-routing.module';
import { StatsLeadsPage } from './stats-leads.page';


@NgModule({
  declarations: [
    StatsLeadsPage
  ],
  imports: [
    CommonModule,
    StatsLeadsRoutingModule,
    MenuStatsModule,
    ContainerSelectStatsPeriodModule,
    LoadingContentModule
  ],
  providers: [
      ContactSourceService,
      LeadService,
      QuotationService
  ]
})
export class StatsLeadsModule { }
