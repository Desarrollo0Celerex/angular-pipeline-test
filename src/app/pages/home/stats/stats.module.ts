import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CardContentKpiModule } from '@components/card-content-kpi/card-content-kpi.module';
import { LeadService } from '@services/lead.service';
import { ClientService } from '@services/client.service';
import { PaymentService } from '@services/payment.service';
import { SinisterService } from '@services/sinister.service';

import { StatsRoutingModule } from './stats-routing.module';
import { StatsLayout } from './stats.layout';


@NgModule({
  declarations: [
    StatsLayout
  ],
  imports: [
    CommonModule,
    StatsRoutingModule,
    RouterModule,
    CardContentKpiModule
  ],
  providers: [
      LeadService,
      ClientService,
      SinisterService,
      PaymentService
  ]
})
export class StatsModule { }
