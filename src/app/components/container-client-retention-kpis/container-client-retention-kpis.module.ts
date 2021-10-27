import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardKpiOneModule } from '@components/card-kpi-one/card-kpi-one.module';
import { ClientService } from '@services/client.service';
import { WorkspaceService } from '@services/workspace.service';

import { ContainerClientRetentionKpisComponent } from './container-client-retention-kpis.component';

@NgModule({
  declarations: [
    ContainerClientRetentionKpisComponent
  ],
  exports: [
      ContainerClientRetentionKpisComponent
  ],
  imports: [
    CommonModule,
    CardKpiOneModule
  ],
  providers: [
      ClientService,
      WorkspaceService
  ]
})
export class ContainerClientRetentionKpisModule { }
