import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardKpiWorkspaceQuotationsOpenedModule } from '@components/card-kpi-workspace-quotations-opened/card-kpi-workspace-quotations-opened.module';
import { CardKpiWorkspaceRenewalsPendingModule } from '@components/card-kpi-workspace-renewals-pending/card-kpi-workspace-renewals-pending.module';
import { CardKpiWorkspaceReceiptsPendingModule } from '@components/card-kpi-workspace-receipts-pending/card-kpi-workspace-receipts-pending.module';
import { CardKpiWorkspaceSinistersOpenedModule } from '@components/card-kpi-workspace-sinisters-opened/card-kpi-workspace-sinisters-opened.module';

import { ContainerWalletKpisComponent } from './container-wallet-kpis.component';

@NgModule({
  declarations: [
    ContainerWalletKpisComponent
  ],
  exports: [
    ContainerWalletKpisComponent
  ],
  imports: [
    CardKpiWorkspaceQuotationsOpenedModule,
    CardKpiWorkspaceRenewalsPendingModule,
    CardKpiWorkspaceReceiptsPendingModule,
    CardKpiWorkspaceSinistersOpenedModule,
    CommonModule
  ]
})
export class ContainerWalletKpisModule { }
