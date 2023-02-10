import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardKpiWorkspaceQuotationsOpenedModule } from '@components/card-kpi-workspace-quotations-opened/card-kpi-workspace-quotations-opened.module';

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
    CommonModule
  ]
})
export class ContainerWalletKpisModule { }
