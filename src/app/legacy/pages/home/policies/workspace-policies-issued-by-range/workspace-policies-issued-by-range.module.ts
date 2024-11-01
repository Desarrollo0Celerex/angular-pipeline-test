import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardContentTitleModule } from '@components/card-content-title/card-content-title.module';
import { ContainerChartsWorkspacePoliciesIssuedModule } from '@components/container-charts-workspace-policies-issued/container-charts-workspace-policies-issued.module';
import { ContainerSelectStatsPeriodModule } from '@components/container-select-stats-period/container-select-stats-period.module';
import { ContentListModule } from '@components/content-list/content-list.module';

import { WorkspacePoliciesIssuedByRangeRoutingModule } from './workspace-policies-issued-by-range-routing.module';
import { WorkspacePoliciesIssuedByRangePage } from './workspace-policies-issued-by-range.page';
import { CardReportIssuedPoliciesModule } from '@components/card-report-issued-policies/card-report-issued-policies.module';

@NgModule({
    declarations: [WorkspacePoliciesIssuedByRangePage],
    imports: [
        CardContentTitleModule,
        CardReportIssuedPoliciesModule,
        CommonModule,
        ContainerChartsWorkspacePoliciesIssuedModule,
        ContainerSelectStatsPeriodModule,
        ContentListModule,
        WorkspacePoliciesIssuedByRangeRoutingModule,
    ],
})
export class WorkspacePoliciesIssuedByRangeModule {}
