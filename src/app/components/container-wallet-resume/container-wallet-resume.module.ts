import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardKpiWorkspacePoliciesCancelledModule } from '@components/card-kpi-workspace-policies-cancelled/card-kpi-workspace-policies-cancelled.module';

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
    CommonModule
  ]
})
export class ContainerWalletResumeModule { }
