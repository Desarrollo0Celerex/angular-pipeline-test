import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardKpiWorkspaceQuotationsClosedModule } from '@components/card-kpi-workspace-quotations-closed/card-kpi-workspace-quotations-closed.module';
import { CardKpiWorkspaceRenewalsAppliedModule } from '@components/card-kpi-workspace-renewals-applied/card-kpi-workspace-renewals-applied.module';
import { CardKpiWorkspaceReceiptsPaidModule } from '@components/card-kpi-workspace-receipts-paid/card-kpi-workspace-receipts-paid.module';
import { CardKpiWorkspaceSinistersClosedModule } from '@components/card-kpi-workspace-sinisters-closed/card-kpi-workspace-sinisters-closed.module';

import { ContainerWorkspaceKpisComponent } from './container-workspace-kpis.component';

@NgModule({
  declarations: [
    ContainerWorkspaceKpisComponent
  ],
  exports: [
    ContainerWorkspaceKpisComponent
  ],
  imports: [
    CardKpiWorkspaceQuotationsClosedModule,
    CardKpiWorkspaceRenewalsAppliedModule,
    CardKpiWorkspaceReceiptsPaidModule,
    CardKpiWorkspaceSinistersClosedModule,
    CommonModule
  ]
})
export class ContainerWorkspaceKpisModule { }
