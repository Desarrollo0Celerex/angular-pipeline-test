import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SinisterService } from '@services/sinister.service';

import { CardKpiPercentageModule } from '@components/card-kpi-percentage/card-kpi-percentage.module';
import { CardKpiWorkspaceSinistersClosedComponent } from './card-kpi-workspace-sinisters-closed.component';

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
    SinisterService
  ]
})
export class CardKpiWorkspaceSinistersClosedModule { }
