import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WorkspaceQuotationsClosedByRangePage } from './workspace-quotations-closed-by-range.page';

const routes: Routes = [{ path: '', component: WorkspaceQuotationsClosedByRangePage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkspaceQuotationsClosedByRangeRoutingModule { }
