import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardContentTitleModule } from '@components/card-content-title/card-content-title.module';
import { ContainerChartsWorkspacePoliciesPendingModule } from '@components/container-charts-workspace-policies-pending/container-charts-workspace-policies-pending.module';
import { ContentListModule } from '@components/content-list/content-list.module';

import { WorkspacePoliciesPendingRoutingModule } from './workspace-policies-pending-routing.module';
import { WorkspacePoliciesPendingPage } from './workspace-policies-pending.page';


@NgModule({
  declarations: [
    WorkspacePoliciesPendingPage
  ],
  imports: [
    CardContentTitleModule,
    ContainerChartsWorkspacePoliciesPendingModule,
    CommonModule,
    ContentListModule,
    WorkspacePoliciesPendingRoutingModule
  ]
})
export class WorkspacePoliciesPendingModule { }
