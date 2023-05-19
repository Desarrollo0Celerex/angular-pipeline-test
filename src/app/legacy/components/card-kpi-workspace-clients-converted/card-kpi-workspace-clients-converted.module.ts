import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardKpiRangeModule } from '@components/card-kpi-range/card-kpi-range.module';
import { ClientService } from '@services/client.service';

import { CardKpiWorkspaceClientsConvertedComponent } from './card-kpi-workspace-clients-converted.component';

@NgModule({
  declarations: [
    CardKpiWorkspaceClientsConvertedComponent
  ],
  exports: [
    CardKpiWorkspaceClientsConvertedComponent
  ],
  imports: [
    CardKpiRangeModule,
    CommonModule
  ],
  providers: [
    ClientService
  ]
})
export class CardKpiWorkspaceClientsConvertedModule { }
