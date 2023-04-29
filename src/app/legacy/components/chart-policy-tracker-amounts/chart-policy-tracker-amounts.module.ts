import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { PolicyService } from '@services/policy.service';
import { WorkspaceService } from '@core/services/workspace/workspace.service';

import { ChartPolicyTrackerAmountsComponent } from './chart-policy-tracker-amounts.component';

@NgModule({
    declarations: [ChartPolicyTrackerAmountsComponent],
    exports: [ChartPolicyTrackerAmountsComponent],
    imports: [CommonModule, LoadingContentModule],
    providers: [PolicyService, WorkspaceService],
})
export class ChartPolicyTrackerAmountsModule {}
