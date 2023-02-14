import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WorkspaceQuotationsOpenedByRangePage } from './workspace-quotations-opened-by-range.page';

const routes: Routes = [{ path: '', component: WorkspaceQuotationsOpenedByRangePage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkspaceQuotationsOpenedByRangeRoutingModule { }
