import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ContainerGlobalKpisModule } from '@components/container-global-kpis/container-global-kpis.module';

import { StatsRoutingModule } from './stats-routing.module';
import { StatsLayout } from './stats.layout';

@NgModule({
  declarations: [
    StatsLayout
  ],
  imports: [
    CommonModule,
    ContainerGlobalKpisModule,
    StatsRoutingModule,
    RouterModule
  ]
})
export class StatsModule { }
