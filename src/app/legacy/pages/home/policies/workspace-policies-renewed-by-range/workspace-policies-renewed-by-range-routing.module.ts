import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WorkspacePoliciesRenewedByRangePage } from './workspace-policies-renewed-by-range.page';

const routes: Routes = [{ path: '', component: WorkspacePoliciesRenewedByRangePage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkspacePoliciesRenewedByRangeRoutingModule { }
