import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WorkspaceReceiptsPendingByRangePage } from './workspace-receipts-pending-by-range.page';

const routes: Routes = [{ path: '', component: WorkspaceReceiptsPendingByRangePage}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkspaceReceiptsPendingByRangeRoutingModule { }
