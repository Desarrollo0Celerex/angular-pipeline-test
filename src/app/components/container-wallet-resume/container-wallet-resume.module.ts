import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardKpiWorkspacePoliciesCancelledModule } from '@components/card-kpi-workspace-policies-cancelled/card-kpi-workspace-policies-cancelled.module';
import { CardKpiWorkspacePoliciesIssuedModule } from '@components/card-kpi-workspace-policies-issued/card-kpi-workspace-policies-issued.module';
import { ChartWorkspaceCancellationsVsEmissionsModule } from '@components/chart-workspace-cancellations-vs-emissions/chart-workspace-cancellations-vs-emissions.module';
import { CardKpiWorkspaceLeadsConvertedModule } from '@components/card-kpi-workspace-leads-converted/card-kpi-workspace-leads-converted.module';

import { ContainerWalletResumeComponent } from './container-wallet-resume.component';

@NgModule({
  declarations: [
    ContainerWalletResumeComponent
  ],
  exports: [
    ContainerWalletResumeComponent
  ],
  imports: [
    CardKpiWorkspacePoliciesCancelledModule,
    CardKpiWorkspacePoliciesIssuedModule,
    ChartWorkspaceCancellationsVsEmissionsModule,
    CardKpiWorkspaceLeadsConvertedModule,
    CommonModule
  ]
})
export class ContainerWalletResumeModule { }
