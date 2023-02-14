import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WorkspaceReceiptsPaidByRangePage } from './workspace-receipts-paid-by-range.page'

const routes: Routes = [{ path: '', component: WorkspaceReceiptsPaidByRangePage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkspaceReceiptsPaidByRangeRoutingModule { }
