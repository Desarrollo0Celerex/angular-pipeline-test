import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WorkspaceRenewalsPendingByRangePage } from './workspace-renewals-pending-by-range.page';

const routes: Routes = [{ path: '', component: WorkspaceRenewalsPendingByRangePage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkspaceRenewalsPendingByRangeRoutingModule { }
