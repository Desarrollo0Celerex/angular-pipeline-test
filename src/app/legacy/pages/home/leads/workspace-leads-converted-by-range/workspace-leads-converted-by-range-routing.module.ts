import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WorkspaceLeadsConvertedByRangePage } from './workspace-leads-converted-by-range.page';

const routes: Routes = [{ path: '', component: WorkspaceLeadsConvertedByRangePage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkspaceLeadsConvertedByRangeRoutingModule { }
