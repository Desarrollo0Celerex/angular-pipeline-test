import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WorkspaceSinistersClosedByRangePage } from './workspace-sinisters-closed-by-range.page';

const routes: Routes = [{ path: '', component: WorkspaceSinistersClosedByRangePage}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkspaceSinistersClosedByRangeRoutingModule { }
