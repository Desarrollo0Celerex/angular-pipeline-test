import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WorkspaceRenewalsAppliedByRangePage } from './workspace-renewals-applied-by-range.page';

const routes: Routes = [{ path: '', component: WorkspaceRenewalsAppliedByRangePage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkspaceRenewalsAppliedByRangeRoutingModule { }
