import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WorkspaceSinistersOpenedByRangePage } from './workspace-sinisters-opened-by-range.page';

const routes: Routes = [{ path: '', component: WorkspaceSinistersOpenedByRangePage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkspaceSinistersOpenedByRangeRoutingModule { }
