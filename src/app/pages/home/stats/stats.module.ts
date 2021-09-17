import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LeadService } from '@services/lead.service';
import { ClientService } from '@services/client.service';
import { PolicyService } from '@services/policy.service';
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
    RouterModule
  ],
  providers: [
      LeadService,
      ClientService,
      PolicyService,
      SinisterService
  ]
})
export class StatsModule { }
