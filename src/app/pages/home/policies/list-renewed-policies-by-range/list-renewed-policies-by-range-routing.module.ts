import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListRenewedPoliciesByRangePage } from './list-renewed-policies-by-range.page';

const routes: Routes = [{ path: '', component: ListRenewedPoliciesByRangePage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListRenewedPoliciesByRangeRoutingModule { }
