import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkspaceQuotationsOpenedByRangeRoutingModule } from './workspace-quotations-opened-by-range-routing.module';
import { WorkspaceQuotationsOpenedByRangePage } from './workspace-quotations-opened-by-range.page';


@NgModule({
  declarations: [
    WorkspaceQuotationsOpenedByRangePage
  ],
  imports: [
    CommonModule,
    WorkspaceQuotationsOpenedByRangeRoutingModule
  ]
})
export class WorkspaceQuotationsOpenedByRangeModule { }
