import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardKpiWorkspacePoliciesCancelledModule } from '@components/card-kpi-workspace-policies-cancelled/card-kpi-workspace-policies-cancelled.module';
import { CardKpiWorkspacePoliciesIssuedModule } from '@components/card-kpi-workspace-policies-issued/card-kpi-workspace-policies-issued.module';

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
    CommonModule
  ]
})
export class ContainerWalletResumeModule { }
