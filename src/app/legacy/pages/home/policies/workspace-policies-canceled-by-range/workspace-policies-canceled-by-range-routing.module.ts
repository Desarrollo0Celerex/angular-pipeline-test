import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WorkspacePoliciesCanceledByRangePage } from './workspace-policies-canceled-by-range.page';

const routes: Routes = [{ path: '', component: WorkspacePoliciesCanceledByRangePage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkspacePoliciesCanceledByRangeRoutingModule { }
