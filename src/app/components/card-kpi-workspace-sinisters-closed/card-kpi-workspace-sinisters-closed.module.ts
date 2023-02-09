import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SinisterService } from '@services/sinister.service';

import { CardKpiPercentageModule } from '@components/card-kpi-percentage/card-kpi-percentage.module';
import { CardKpiWorkspaceSinistersClosedComponent } from './card-kpi-workspace-sinisters-closed.component';
import { CardKpiWorkspaceSinistersClosedService } from './card-kpi-workspace-sinisters-closed.service';

@NgModule({
  declarations: [
    CardKpiWorkspaceSinistersClosedComponent
  ],
  exports: [
    CardKpiWorkspaceSinistersClosedComponent
  ],
  imports: [
    CardKpiPercentageModule,
    CommonModule
  ],
  providers: [
    CardKpiWorkspaceSinistersClosedService,
    SinisterService
  ]
})
export class CardKpiWorkspaceSinistersClosedModule { }
