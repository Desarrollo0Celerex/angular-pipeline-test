import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatsRoutingModule } from './stats-routing.module';
import { StatsLayout } from './stats.layout';


@NgModule({
  declarations: [
    StatsLayout
  ],
  imports: [
    CommonModule,
    StatsRoutingModule
  ]
})
export class StatsModule { }
