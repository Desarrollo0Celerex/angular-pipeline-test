import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WorkspaceClientsConvertedByRangePage } from './workspace-clients-converted-by-range.page';

const routes: Routes = [{ path: '', component: WorkspaceClientsConvertedByRangePage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkspaceClientsConvertedByRangeRoutingModule { }
