import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WorkspacePoliciesIssuedByRangePage } from './workspace-policies-issued-by-range.page';

const routes: Routes = [{ path: '', component: WorkspacePoliciesIssuedByRangePage}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkspacePoliciesIssuedByRangeRoutingModule { }
