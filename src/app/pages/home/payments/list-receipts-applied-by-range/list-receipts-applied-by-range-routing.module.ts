import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListReceiptsAppliedByRangePage } from './list-receipts-applied-by-range.page'

const routes: Routes = [{ path: '', component: ListReceiptsAppliedByRangePage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListReceiptsAppliedByRangeRoutingModule { }
