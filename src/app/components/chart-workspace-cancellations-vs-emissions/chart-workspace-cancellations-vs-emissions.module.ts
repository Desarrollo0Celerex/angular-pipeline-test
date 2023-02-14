import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { PolicyService } from '@services/policy.service';

import { ChartWorkspaceCancellationsVsEmissionsComponent } from './chart-workspace-cancellations-vs-emissions.component';

@NgModule({
  declarations: [
    ChartWorkspaceCancellationsVsEmissionsComponent
  ],
  exports: [
    ChartWorkspaceCancellationsVsEmissionsComponent
  ],
  imports: [
    CommonModule,
    LoadingContentModule
  ],
  providers: [
    PolicyService
  ]
})
export class ChartWorkspaceCancellationsVsEmissionsModule { }
