import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardKpiRangeModule } from '@components/card-kpi-range/card-kpi-range.module';
import { SinisterService } from '@services/sinister.service';

import { CardKpiWorkspaceSinistersOpenedComponent } from './card-kpi-workspace-sinisters-opened.component';
import { CardKpiWorkspaceSinistersOpenedService } from './card-kpi-workspace-sinisters-opened.service';

@NgModule({
  declarations: [
    CardKpiWorkspaceSinistersOpenedComponent
  ],
  exports: [
    CardKpiWorkspaceSinistersOpenedComponent
  ],
  imports: [
    CardKpiRangeModule,
    CommonModule
  ],
  providers: [
    CardKpiWorkspaceSinistersOpenedService,
    SinisterService
  ]
})
export class CardKpiWorkspaceSinistersOpenedModule { }
